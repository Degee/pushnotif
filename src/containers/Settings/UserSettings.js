import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {UserSettingsForm} from 'components';
import { saveUser } from 'redux/modules/settings';
import {Alert} from 'react-bootstrap';

@connect(
  (state) => ({
    user: state.auth.user,
    error: state.settings.saveError,
  }),
  {saveUser})
export default class UserSettings extends Component {
  static propTypes = {
    saveUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    error: PropTypes.string.isRequired,
  }

  constructor() {
    super();
    this.state = {showCreated: false};
  }

  showMessage() {
    this.setState({showCreated: true});
    setTimeout(() => {
      this.setState({showCreated: false});
    }, 3000);
  }

  handleSubmit = (data) => {
    this.props.saveUser(data).then(() => {
      this.showMessage();
    });
  }

  render() {
    return (
      <div className="container">
        <h1>User Settings</h1>
        <Helmet title="User Settings"/>
        {this.props.error && this.props.error.message &&
          <Alert bsStyle="danger">
            <strong>Error</strong> {this.props.error.message}
          </Alert>
        }

        {this.state.showCreated &&
        <Alert bsStyle="success">
          <strong>Settings</strong> has been successfully saved.
        </Alert>
        }

        <UserSettingsForm onSubmit={this.handleSubmit}/>
      </div>
    );
  }
}
