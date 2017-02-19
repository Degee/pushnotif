import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';
import {Link} from 'react-router';
import * as validator from '../../utils/validation';

@connect(
  state => ({result: state.auth.registration}),
  authActions)
export default class Registration extends Component {
  static propTypes = {
    result: PropTypes.object,
    register: PropTypes.func
  }

  constructor() {
    super();

    this.state = {
      error: ''
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const email = this.refs.username.value;
    const pass = this.refs.password.value;
    const passConfirm = this.refs.passwordConfirm.value;

    this.setState({error: ''});
    if (validator.isEmpty(email)) {
      this.setState({error: 'Email must be filled!'});
      return;
    }
    if (!validator.email(email)) {
      this.setState({error: 'Email must be valid!'});
      return;
    }
    if (validator.isEmpty(pass) || validator.isEmpty(passConfirm)) {
      this.setState({error: 'Both passwords must be filled'});
      return;
    }
    if (!validator.areValuesSame(pass, passConfirm)) {
      this.setState({error: 'Confirm password must be same as password'});
      return;
    }

    this.props.register(
      email,
      this.refs.password.value,
      this.refs.passwordConfirm.value
    );
  }

  render() {
    const styles = require('./Login.scss');

    return (
      <div className={styles.loginPage + ' container'}>
        <Helmet title="Login"/>
        <div className="col-md-4 col-md-offset-4">

          <div className="panel panel-success">
            <div className="panel-heading">Registration</div>
            <div className="panel-body">
              <form className="login-form" onSubmit={this.handleSubmit}>
                {this.props.result &&
                <div className="alert alert-danger">
                  {this.props.result.message}
                </div>
                }
                {this.state.error &&
                <div className="alert alert-danger">
                  {this.state.error}
                </div>
                }

                <div className="form-group">
                  <input type="text" ref="username" placeholder="Email" className="form-control"/>
                </div>
                <div className="form-group">
                  <input type="password" ref="password" placeholder="Password" className="form-control"/>
                </div>
                <div className="form-group">
                  <input type="password" ref="passwordConfirm" placeholder="Password confirm" className="form-control"/>
                </div>

                <div className="text-center">
                  <button className="btn btn-primary" onClick={this.handleSubmit}>
                    <i className="fa fa-user-plus"/>{' '}Register
                  </button>
                </div>
              </form>
            </div>
            <div className="panel-footer">
              <div className="text-center">
                <div className="btn-group-xs pull-left">
                  <Link className="btn btn-success" to="/login">
                    <i className="fa fa-sign-in"/>{' '}Log In
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
