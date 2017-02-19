import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as authActions from 'redux/modules/auth';
import { Link } from 'react-router';

@connect(
    state => ({user: state.auth.user}),
    authActions)
export default
class LoginSuccess extends Component {
  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func
  }

  render() {
    const {user, logout} = this.props;
    return (user &&
      <div className="container">
        <h1>Login Success</h1>
        <div>
          <div>
            <h2>Hi, {user.email}. </h2>
            <p>You have just successfully logged in.</p>
            <p>You have now opened all of the fetures that our service provides.</p>
          </div>
          <br />
          <div className="alert alert-info">
            Dont forget go to <Link to="/settings">settings</Link> page and set your Firebase Cloud Messaging and Windows Notification Service credentials.
          </div>

          <div>
            You can log out: <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
          </div>
        </div>
      </div>
    );
  }
}
