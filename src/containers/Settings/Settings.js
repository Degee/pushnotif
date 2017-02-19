import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {SettingsForm} from 'components';
import { saveConfig } from 'redux/modules/settings';

import { isLoaded as isSettingsLoaded, getConfig } from 'redux/modules/settings';
import { asyncConnect } from 'redux-async-connect';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    if (!isSettingsLoaded(getState())) {
      promises.push(dispatch(getConfig()));
    }

    return Promise.all(promises);
  }
}])
@connect(
  (state) => ({error: state.settings.saveError}),
  {saveConfig})
export default class Settings extends Component {
  static propTypes = {
    saveConfig: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
  }

  constructor() {
    super();
    this.state = {
      actionSent: false,
    };
  }

  handleSubmit = (data) => {
    this.props.saveConfig(data);
    this.setState({actionSent: true});
  }

  render() {
    const { error } = this.props;
    return (
      <div className="container">
        <h1>Settings</h1>
        <Helmet title="Settings"/>
        {this.state.actionSent &&
          <div className={error ? 'alert alert-danger' : 'alert alert-success'}>
            {error ? error : 'Api config was successfully saved!!!'}
          </div>
        }
        <p>
          This is a page for set the credentials of Firebase Cloud Messaging (for Android and iOs).
          You should have this settings valid, otherwise notifications will not be sent.
        </p>
        <p>
          For more info how to get credentials see:
          <br />
          • <a href="https://firebase.google.com/docs/cloud-messaging/server" target="_blank">Firebase Cloud Messaging</a>
          <br />
        </p>
        <SettingsForm onSubmit={this.handleSubmit}/>
        <p>
          You can create development account right here:
          <br />
          • <a href="https://console.firebase.google.com/" target="_blank">Firebase Cloud Messaging</a>
          <br />
        </p>
      </div>
    );
  }
}
