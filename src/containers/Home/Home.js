import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { asyncConnect } from 'redux-async-connect';
import { isSummaryLoaded, getSummary } from 'redux/modules/notifications';
import {Panel, ListGroup, ListGroupItem, Glyphicon} from 'react-bootstrap';
import moment from 'moment';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    if (!isSummaryLoaded(getState())) {
      promises.push(dispatch(getSummary()));
    }
    return Promise.all(promises);
  }
}])
@connect(
  state => ({notifications: state.notifications.notifications}),
  {})
export default class Home extends Component {
  render() {
    const styles = require('./Home.scss');
    const { notifications } = this.props;

    return (
      <div className={styles.home}>
        <Helmet title="Dashboard"/>

        <div className="jumbotron">
          <div className="container">
            <h1>Welcome!</h1>
            Push notification service is right here for you...
          </div>
      </div>
      <div className="container">
        <div className="col-md-4">
          <Panel header={'Notifications sent'} bsStyle="success">
            <div>
                <ListGroup>
                    <ListGroupItem>
                      <strong>Today</strong>
                      <span className="pull-right">{notifications.filter((item) => item.isSent && (moment(item.datetime) > moment().subtract(1, 'days'))).length}</span>
                    </ListGroupItem>
                    <ListGroupItem>
                      <strong>Last week</strong>
                      <span className="pull-right"> {notifications.filter((item) => item.isSent && (moment(item.datetime) > moment().subtract(1, 'week'))).length}</span>
                    </ListGroupItem>
                    <ListGroupItem>
                      <strong>Last month</strong>
                      <span className="pull-right">{notifications.filter((item) => item.isSent && (moment(item.datetime) > moment().subtract(1, 'month'))).length}</span>
                    </ListGroupItem>
                    <ListGroupItem>
                      <strong>All the time</strong>
                      <span className="pull-right">{notifications.filter((item) => item.isSent).length}</span>
                    </ListGroupItem>
                </ListGroup>
            </div>
          </Panel>
        </div>
        <div className="col-md-4">
          <Panel header={'Notification waiting'} bsStyle="primary">
            <div>
              <ListGroup>
                <ListGroupItem>
                  <strong>In system currently waiting</strong>
                  <span className="pull-right"> {notifications.filter((item) => !item.isSent).length}</span>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Panel>
        </div>
      </div>
    </div>
    );
  }
}
