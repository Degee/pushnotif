import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';
import {Link} from 'react-router';

@connect(
  state => ({user: state.auth.user, loginError: state.auth.loginError}),
  authActions)
export default class Login extends Component {
  static propTypes = {
    loginError: PropTypes.object,
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const inputEmail = this.refs.username;
    const inputPassword = this.refs.password;

    this.props.login(inputEmail.value, inputPassword.value);
  }

  render() {
    const styles = require('./Login.scss');
    return (
      <div className={styles.loginPage + ' container'}>
        <Helmet title="Login"/>
        <div className="col-md-4 col-md-offset-4">

          <div className="panel panel-success">
            <div className="panel-heading">Login</div>
            <div className="panel-body">
              <form className="login-form" onSubmit={this.handleSubmit}>

                {this.props.loginError &&
                <div className="alert alert-danger">
                  {this.props.loginError.message}
                </div>
                }

                <div className="form-group">
                  <input type="text" ref="username" placeholder="Enter a username" className="form-control"/>
                </div>
                <div className="form-group">
                  <input type="password" ref="password" placeholder="Enter a password" className="form-control"/>
                </div>

                <div className="text-center">
                  <button className="btn btn-success" onClick={this.handleSubmit}>
                    <i className="fa fa-sign-in"/>{' '}Log In
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
                  <Link className="btn btn-info" to="/forgottenPassword">
                    <i className="fa fa-question"/>{' '}Forgotten password
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
