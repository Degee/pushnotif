import React, {Component, PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import notificationsValidation from './notificationsValidation';
import {Modal} from 'react-bootstrap';
import moment from 'moment';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

@connect(state => ({
  devices: state.devices.devices,
  initialValues: {
    allDevices: true,
    isSent: false,
  }
}), {})
@reduxForm({
  form: 'notificationNew',
  fields: ['title', 'text', 'datetime', 'devices', 'allDevices', 'isSent'],
  validate: notificationsValidation
})
export default class NotificationsForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    edit: PropTypes.object.isRequired,
    onExit: PropTypes.func.isRequired,
  };

  constructor() {
    super();
  }

  componentDidMount() {
    const { fields: {title, text, datetime, devices, allDevices}, edit } = this.props;
    datetime.onChange(moment().toDate());
    if (edit !== null) {
      title.onChange(edit.title);
      text.onChange(edit.text);
      datetime.onChange(edit.datetime);
      devices.onChange(edit.devices.map((item) => item._id));
      if (edit.devices.length !== this.props.devices.length) {
        allDevices.onChange(false);
      }
    }
  }

  render() {
    const {
      fields: {title, text, datetime, devices, allDevices},
      handleSubmit,
    } = this.props;

    const renderInput = (field, label) =>
      <div className={'form-group' + (field.error && field.touched ? ' has-error' : '')}>
        <label htmlFor={field.name} className="col-sm-2">{label}</label>
        <div className={'col-sm-8'}>
          <input type="text" className="form-control" id={field.name} {...field} required />
          {field.error && field.touched && <div className="text-danger pull-right">{field.error}</div>}
        </div>
      </div>;

    return (
      <Modal keyboard show onExit={this.props.onExit}>
        <Modal.Header closeButton onHide={this.props.onExit}>
          <Modal.Title>{this.props.edit ? 'Edit notification' : 'New notification'}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <form className={`form-horizontal`} onSubmit={handleSubmit}>
              {renderInput(title, 'Title')}
              {renderInput(text, 'Text')}

              <div className={'form-group' + (datetime.error && datetime.touched ? ' has-error' : '')}>
                <label htmlFor={datetime.name} className="col-sm-2">Send date and time</label>
                <div className={'col-sm-8'}>
                  <Datetime
                    inputProps={{readOnly: 'true'}}
                    {...datetime}
                    defaultValue={moment()}
                    isValidDate={ (current) => current > moment().subtract(1, 'days') }
                  />

                </div>
              </div>


              <div className={'form-group' + (devices.error && devices.touched ? ' has-error' : '')}>
                <label htmlFor={devices.name} className="col-sm-2">Devices</label>
                <div className={'col-sm-8'}>
                  <div>
                    <label htmlFor="selectAll">All</label>
                    {'  '}
                    <input type="checkbox" name="selectAll" {...allDevices} />
                  </div>

                  {!allDevices.value &&
                  <select multiple type="text" className="form-control"
                          id={devices.name} {...devices} required>
                    {this.props.devices.map((item) =>
                      <option
                        key={item._id}
                        value={item._id}>
                          {item._id}
                      </option>
                    )}
                  </select>
                  }
                  {devices.error && devices.touched && <div className="text-danger pull-right">{devices.error}</div>}
                </div>
              </div>

              <div className="form-group">
                <div className="col-sm-10">
                  <button className="btn btn-success pull-right" onClick={handleSubmit}>
                    <i className="fa fa-paper-plane"/> Save
                  </button>
                </div>
              </div>
            </form>
        </Modal.Body>

      </Modal>
    );
  }
}
