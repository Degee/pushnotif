import Component from 'react-pure-render/component';
import React from 'react';
import {Panel, ListGroup, ListGroupItem, Table, Glyphicon, Button} from 'react-bootstrap';
import { NotificationsForm } from 'components';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import { createNotification, deleteNotification, updateNotification } from 'redux/modules/notifications';
import moment from 'moment';
import ConfirmModal from 'components/ConfirmModal/ConfirmModal';

@connect(state => ({
  notifications: state.notifications.notifications,
  devices: state.devices.devices,
}), { createNotification, deleteNotification, updateNotification })
export default class NotificationsBox extends Component {

  static propTypes = {
    notifications: React.PropTypes.array.isRequired
  };

  constructor() {
    super();
    this.state = { edit: false, add: false, confirmDelete: false };

    this.handleCloseConfirm = this.handleCloseConfirm.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleShowDeleteConfirm(id, appId) {
    this.setState({confirmDelete: {id, appId}});
  }

  handleDelete() {
    this.props.deleteNotification({...this.state.confirmDelete})
      .then(() => this.setState({confirmDelete: false}));
  }

  handleCloseConfirm() {
    this.setState({confirmDelete: false});
  }

  toggleAddModal() {
    this.setState({add: !this.state.add, edit: false});
  }

  handleSubmit(values) {
    if (values.allDevices) {
      values.devices = this.props.devices.map(item => item._id);
    }
    if (this.state.edit) {
      this.props.updateNotification(this.props.application._id, this.state.edit._id, values)
        .then(() => this.setState({add: false, edit: false}));
    } else {
      this.props.createNotification(this.props.application._id, values)
        .then(() => this.setState({add: false, edit: false}));
    }
  }


  emptyResult() {
    return (
      <div className="text-center">
        No Notifications
      </div>
    );
  }

  renderNotificationsTable() {
    const {notifications} = this.props;
    if (!notifications.length) {
      this.emptyResult();
    }

    return (
      <Table striped hover responsive>
        <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Text</th>
          <th>Sent</th>
          <th>#Devices</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {notifications.map(dev =>
          <tr key={dev._id}>
            <td>{dev._id}</td>
            <td title={dev.title}>{dev.title}</td>
            <td title={dev.text}>{dev.text && `${dev.text.substring(0, 20)}...`}</td>
            <td>
              {moment(dev.datetime).format('YYYY-MM-DD HH:mm')} {'  '}
              {dev.isSent ? <Glyphicon glyph="ok" /> : <Glyphicon glyph="time" />}
            </td>
            <td>
              {dev.devices.length}
            </td>
            <td>
              <Link to={`/applications/${dev.app._id}`}>
                {dev.app.name}
              </Link>
            </td>
            <td>
              <Glyphicon glyph="wrench"
                         onClick={() => this.setState({edit: dev})}
                         style={{cursor: 'pointer'}} />
              {' '}
              <Glyphicon glyph="trash"
                         onClick={this.handleShowDeleteConfirm.bind(this, dev._id, dev.app._id)}
                         style={{cursor: 'pointer'}} />
            </td>
          </tr>
        )}
        </tbody>
      </Table>
    );
  }

  renderNotifications() {
    const {notifications} = this.props;
    if (!notifications.length) {
      this.emptyResult();
    }

    return (
      <ListGroup>
        {notifications.map(notif =>
          <ListGroupItem key={`notif-list-${notif._id}`}>
            {notif.title}
          </ListGroupItem>
        )}
      </ListGroup>
    );
  }

  render() {
    const styles = require('./NotificationsBox.scss');
    const { table } = this.props;
    const title = (
      <div>
        <div className="pull-left">Notifications</div>
        {!table ?
          <div className="pull-right">
            <button className="btn btn-info"
                    onClick={() => this.props.onDetail({devices: false, notifications: true})} >
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
      <span>
        <Panel header={title} bsStyle="success">
          <div className={styles.content}>
            {table ? this.renderNotificationsTable() : this.renderNotifications()}
          </div>
          <div className="text-right">
            <Button bsStyle="success" onClick={this.toggleAddModal.bind(this)}>+ New notification</Button>
          </div>
        </Panel>

        { (this.state.edit || this.state.add) &&
        <NotificationsForm
          onExit={this.toggleAddModal.bind(this)}
          onSubmit={this.handleSubmit.bind(this)}
          edit={this.state.edit ? this.state.edit : null}
        />
        }

        {this.state.confirmDelete &&
        <ConfirmModal handleClose={this.handleCloseConfirm} handleDelete={this.handleDelete}/>
        }
      </span>
    );
  }

}
