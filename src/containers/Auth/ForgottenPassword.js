import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';
import {Link} from 'react-router';

@connect(
  state => ({result: state.auth.forgottenPassword}),
  authActions)
export default class ForgottenPassword extends Component {
  static propTypes = {
    result: PropTypes.object,
    forgottenPassword: PropTypes.func.isRequired,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const inputEmail = this.refs.username;

    this.props.forgottenPassword(inputEmail.value);
    inputEmail.value = '';
  }

  render() {
    const styles = require('./Login.scss');

    return (
      <div className={styles.loginPage + ' container'}>
        <Helmet title="Forgotten Password"/>
        <div className="col-md-4 col-md-offset-4">

          <div className="panel panel-success">
            <div className="panel-heading">Forgotten password</div>
            <div className="panel-body">
              <form className="login-form" onSubmit={this.handleSubmit}>

                {this.props.result &&
                <div className={this.props.result.error ? 'alert alert-danger' : 'alert alert-success'}>
                  {this.props.result.message}
                </div>
                }

                <div className="form-group">
                  <input type="text" ref="username" placeholder="Your email" className="form-control"/>
                </div>
                <div className="text-center">
                  <button className="btn btn-info" onClick={this.handleSubmit}>
                    <i className="fa fa-mail-forward"/>{' '}Send new password
                  </button>
                </div>
              </form>
            </div>
            <div className="panel-footer">
              <div className="text-center">
                <div className="btn-group-xs pull-left">
                  <Link className="btn btn-primary" to="/registration">
                    <i className="fa fa-user-plus"/>{' '}Registration
                  </Link>
                </div>
                <div className="btn-group-xs pull-right">
                  <Link className="btn btn-success" to="/login">
                    <i className="fa fa-sign-in"/>{' '}Log In
                  </Link>
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
