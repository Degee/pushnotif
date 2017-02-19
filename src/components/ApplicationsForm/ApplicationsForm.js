import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import applicationsValidation from './applicationsValidation';

@connect(() => ({}), {})
@reduxForm({
  form: 'applicationsNew',
  fields: ['name'],
  validate: applicationsValidation
})
export default class ApplicationsForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };

  render() {
    const styles = require('../../containers/Applications/Application.scss');
    const {
      fields: {name},
      handleSubmit,
    } = this.props;

    const renderInput = (field, label) =>
      <div className={'form-group' + (field.error && field.touched ? ' has-error' : '')}>
        <label htmlFor={field.name} className="col-sm-2">{label}</label>
        <div className={'col-sm-8'}>
          <input type="text" className="form-control" id={field.name} {...field}/>
          {field.error && field.touched && <div className="text-danger pull-right">{field.error}</div>}
        </div>
      </div>;

    return (
      <div className={styles.formContainer}>
        <form className={`form-horizontal`} onSubmit={handleSubmit}>
          {renderInput(name, 'Name')}

          <div className="form-group">
            <div className="col-sm-10">
              <button className="btn btn-success pull-right" onClick={handleSubmit}>
                <i className="fa fa-paper-plane"/> Create
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
