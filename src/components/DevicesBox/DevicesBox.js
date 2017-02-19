import Component from 'react-pure-render/component';
import React from 'react';
import {Panel, ListGroup, ListGroupItem, Table, Glyphicon} from 'react-bootstrap';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {deleteDevice} from 'redux/modules/devices';
import moment from 'moment';
import ConfirmModal from 'components/ConfirmModal/ConfirmModal';

@connect(state => ({
  devices: state.devices.devices
}), {deleteDevice})
export default class DevicesBox extends Component {

  static propTypes = {
    devices: React.PropTypes.array.isRequired,
    deleteDevice: React.PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {confirmDelete: false, filter: '' };
    this.handleCloseConfirm = this.handleCloseConfirm.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleShowDeleteConfirm(id, appId) {
    this.setState({confirmDelete: {id, appId}});
  }

  handleDelete() {
    this.props.deleteDevice({...this.state.confirmDelete})
      .then(() => this.setState({confirmDelete: false}));
  }

  handleCloseConfirm() {
    this.setState({confirmDelete: false});
  }

  emptyResult() {
    return (
      <div className="text-center">
        No Devices
      </div>
    );
  }

  filter(dev) {
    /* Our naive filter */
    const fil = this.state.filter;
    if ((dev.registeredId && dev.registeredId.indexOf(fil)) < 0 &&
      dev._id.indexOf(fil) < 0) {
      return true;
    }
    return false;
  }

  renderDevicesTable() {
    const {devices} = this.props;
    const styles = require('./DeviceBox.scss');
    if (!devices.length) {
      this.emptyResult();
    }

    return (
      <div>
        <div className="form-group">
          <input
            type="text"
            value={ this.state.filter }
            onChange={ (ev) => this.setState({ filter: ev.target.value}) }
          />
          {'  '}<Glyphicon glyph="search" style={{opacity: '0.6'}} />
        </div>

        <Table striped hover responsive>
          <thead>
          <tr>
            <th>ID</th>
            <th>Registered ID</th>
            <th>Registered  at</th>
            <th>Application</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
            {devices.map(dev =>
              <tr key={dev._id} style={this.filter(dev) ? {display: 'none'} : {}}>
                <td>{dev._id}</td>
                <td title={dev.registeredId}>{dev.registeredId && dev.registeredId.substring(0, 30)}...</td>
                <td>{moment(dev.registeredAt).format('YYYY-MM-DD')}</td>
                <td>
                  <Link to={`/applications/${dev.app._id}`}>
                    {dev.app.name}
                  </Link>
                </td>
                <td>
                  <Glyphicon glyph="trash"
                             onClick={this.handleShowDeleteConfirm.bind(this, dev._id, dev.app._id)}
                             className={styles.clickable}/>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    );
  }

  renderDevices() {
    const {devices} = this.props;
    if (!devices.length) {
      this.emptyResult();
    }

    return (
      <ListGroup>
        {devices.map(dev =>
          <ListGroupItem key={`dev-list-${dev._id}`}
                         href={`/devices/${dev._id}`}>
            {dev._id}
          </ListGroupItem>
        )}
      </ListGroup>
    );
  }

  render() {
    const { table } = this.props;
    const styles = require('./DeviceBox.scss');
    const title = (
      <div>
        <div className="pull-left">Devices</div>
        {!table ?
          <div className="pull-right">
            <button className="btn btn-info"
                    onClick={() => this.props.onDetail({devices: true, notifications: false})} >
              Details
            </button>
          </div>
          :
        this.props.onDetail &&
          <div className="pull-right">
            <button className="btn btn-info"
                    onClick={() => this.props.onDetail({devices: false, notifications: false})} >
              <Glyphicon glyph="arrow-left" />{' '}Back
            </button>
          </div>
        }
        <div className="clearfix"></div>
      </div>
    );

    return (
      <Panel header={title} bsStyle="info">
        <div className={styles.content}>
          {table ? this.renderDevicesTable() : this.renderDevices()}
        </div>
        {this.state.confirmDelete &&
        <ConfirmModal handleClose={this.handleCloseConfirm} handleDelete={this.handleDelete} />
        }
      </Panel>
    );
  }

}
