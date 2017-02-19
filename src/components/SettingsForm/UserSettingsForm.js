import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import settingsValidation from './settingsValidation';

@connect((state) => ({initialValues: { isActive: state.auth.user.isActive}})
)
@reduxForm({
  form: 'settings',
  fields: ['oldPassword', 'password', 'passwordConfirm', 'isActive'],
  validate: settingsValidation
})
export default class UserSettingsForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  }

  render() {
    const {
      fields: {oldPassword, password, passwordConfirm, isActive},
      handleSubmit
    } = this.props;

    const styles = require('./SettingsForm.scss');
    const renderInput = (field, label) =>
      <div className={'form-group' + (field.error && field.touched ? ' has-error' : '')}>

        <label htmlFor={field.name} className="col-sm-3">{label}</label>
        <div className={'col-sm-6 ' + styles.inputGroup}>
          <input type="password" className="form-control" id={field.name} {...field}/>
          {field.error && field.touched && <div className="text-danger pull-right">{field.error}</div>}
        </div>
      </div>;

    return (
      <div>
        <form className="form-horizontal" onSubmit={handleSubmit}>
          <h3>Password change</h3>
          {renderInput(oldPassword, 'Old password')}
          <hr />
          {renderInput(password, 'New password')}
          {renderInput(passwordConfirm, 'New password confirmation')}

          <div className={'form-group' + (isActive.error && isActive.touched ? ' has-error' : '')}>
            <label htmlFor={isActive.name} className="col-sm-3">Active</label>
            <div className={'col-sm-6 ' + styles.inputGroup}>
              <input type="checkbox" className="form-control" id={isActive.name} {...isActive}/>
            </div>
          </div>;
          
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
