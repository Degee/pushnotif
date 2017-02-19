import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem, DropdownButton, MenuItem, Glyphicon } from 'react-bootstrap';
import Helmet from 'react-helmet';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { push } from 'react-router-redux';
import config from '../../config';
import { asyncConnect } from 'redux-async-connect';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }

    return Promise.all(promises);
  }
}])
@connect(
  state => ({user: state.auth.user}),
  {logout, pushState: push})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState('/loginSuccess');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/login');
    }
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    const {user} = this.props;
    const styles = require('./App.scss');

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head}/>
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <IndexLink to="/">
                <div className={styles.brand}/>
                <span>{config.app.title}</span>
              </IndexLink>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>

          {user &&
            <Navbar.Collapse eventKey={0}>
              <Nav navbar>
                <LinkContainer to="/dashboard">
                  <NavItem eventKey={1}>Dashboard</NavItem>
                </LinkContainer>
                <LinkContainer to="/applications">
                  <NavItem eventKey={2}>Applications</NavItem>
                </LinkContainer>
                <LinkContainer to="/settings">
                  <NavItem eventKey={3}>Settings</NavItem>
                </LinkContainer>
                <LinkContainer to="/devices">
                  <NavItem eventKey={4}>Devices</NavItem>
                </LinkContainer>
              </Nav>
              <Nav navbar pullRight>
                <DropdownButton bsStyle={'link'} bsSize={'large'} title={user.email} id="user-menu">
                  <LinkContainer to="/user/settings">
                    <MenuItem eventKey="6">
                      <Glyphicon glyph="cog" /> {' '} Settings
                    </MenuItem>
                  </LinkContainer>
                  <MenuItem divider/>
                  <LinkContainer to="/logout">
                    <MenuItem eventKey="7" onClick={this.handleLogout}>
                      <Glyphicon glyph="off" /> {' '} Logout
                    </MenuItem>
                  </LinkContainer>
                </DropdownButton>
              </Nav>
            </Navbar.Collapse>
          }
        </Navbar>

        <div className={styles.appContent}>
          {this.props.children}
        </div>

        <div className="well text-center">
          This is a client application for push notification server. More info <a
          href="https://github.com/Degee/pushnotif"
          target="_blank">on Github</a>.
          <br />
          Application was created as a part of master thesis on Faculty of Information Technology,
          Czech Technical University in Prague, 2017
        </div>
      </div>
    );
  }
}
