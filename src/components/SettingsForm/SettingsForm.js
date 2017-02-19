import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';

@connect((state) => ({initialValues: state.settings.settings})
)
@reduxForm({
  form: 'settings',
  fields: ['fcmToken']
})
export default
class SettingsForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  }

  render() {
    const {
      fields: {fcmToken},
      handleSubmit,
      } = this.props;

    const styles = require('./SettingsForm.scss');
    const renderInput = (field, label) =>
      <div className={'form-group' + (field.error && field.touched ? ' has-error' : '')}>

        <label htmlFor={field.name} className="col-sm-2">{label}</label>
        <div className={'col-sm-8 ' + styles.inputGroup}>
          <input type="text" className="form-control" id={field.name} {...field}/>
        </div>
      </div>;

    return (
      <div>
        <form className="form-horizontal" onSubmit={handleSubmit}>
          <h3>Firebase</h3>
          {renderInput(fcmToken, 'Server API key')}

          <div className="form-group">
            <div className="col-sm-10">
              <button className="btn btn-success pull-right" onClick={handleSubmit}>
                <i className="fa fa-paper-plane"/> Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
