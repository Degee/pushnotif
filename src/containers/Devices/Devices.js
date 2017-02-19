import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as devicesActions from 'redux/modules/devices';
import { DevicesBox } from 'components';

@connect(
  (state) => ({devices: state.devices.devices}),
  devicesActions)
export default class Devices extends Component {
  static propTypes = {
    getDevices: PropTypes.func.isRequired,
    devices: PropTypes.array.isRequired,
  }

  componentDidMount() {
    this.props.getDevices();
  }

  render() {
    return (
      <div className="container">
        <h1>Devices</h1>
        <Helmet title="Devices"/>
        <DevicesBox table />
      </div>
    );
  }
}
