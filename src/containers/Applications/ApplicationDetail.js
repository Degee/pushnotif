import Component from 'react-pure-render/component';
import React from 'react';
import {connect} from 'react-redux';
import {getApplicationDevices} from 'redux/modules/devices';
import {getApplicationNotifications} from 'redux/modules/notifications';
import { DevicesBox, NotificationsBox } from 'components';
import { areApplicationsLoaded, getApplications } from 'redux/modules/applications';
import { asyncConnect } from 'redux-async-connect';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    if (!areApplicationsLoaded(getState())) {
      promises.push(dispatch(getApplications()));
    }

    return Promise.all(promises);
  }
}])
@connect(state => ({
  applications: state.applications.list
}), {getApplicationDevices, getApplicationNotifications})
export default class ApplicationDetail extends Component {

  static propTypes = {
    params: React.PropTypes.object.isRequired,
    applications: React.PropTypes.array.isRequired,
    getApplicationDevices: React.PropTypes.func.isRequired,
    getApplicationNotifications: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    const {applications, params: {appId}} = props;
    this.application = applications.find(app => app._id === appId);
    this.state = {
      devices: false,
      notifications: false,
    }
  }

  componentWillMount() {
    if (this.application) {
      this.props.getApplicationDevices(this.application._id);
      this.props.getApplicationNotifications(this.application._id);
    }
  }

  onDetail(show) {
    this.setState(
      {...show}
    )
  }

  render() {
    if (!this.application) {
      return (
        <div className="container">
          <h1>Error 404: Application not Found</h1>
        </div>
      );
    }
    const customClass = this.state.notifications || this.state.devices ? 'col-md-12' : 'col-md-6';

    return (
      <div className="container">
        { !this.state.devices && !this.state.notifications && <h1>Application Detail</h1>}
        { this.state.devices && <h1>Devices of application <strong>{this.application.name}</strong></h1>}
        { this.state.notifications && <h1>Notifications of application <strong>{this.application.name}</strong></h1>}

        <div className="row">
          {!this.state.notifications &&
          <div className={customClass}>
            <DevicesBox
              onDetail={this.onDetail.bind(this)}
              application={this.application}
              table={this.state.devices}
            />
          </div>
          }
          {!this.state.devices &&
          <div className={customClass}>
            <NotificationsBox
              application={this.application}
              table={this.state.notifications}
              onDetail={this.onDetail.bind(this)}
            />
          </div>
          }
        </div>

      </div>
    );
  }

}
