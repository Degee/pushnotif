import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
    Login,
    ForgottenPassword,
    Registration,
    App,
    LoginSuccess,
    Settings,
    UserSettings,
    Devices,
    Applications,
    ApplicationNew,
    ApplicationDetail,

    Home,
    NotFound,
  } from 'containers';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replace('/login');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  const requireLogout = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (user) {
        replace('/');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>

      { /* Routes */ }
      <Route onEnter={requireLogout}>
        <Route path="login" component={Login}/>
        <Route path="registration" component={Registration}/>
        <Route path="forgottenPassword" component={ForgottenPassword}/>
      </Route>

      { /* Routes requiring login */ }
      <Route onEnter={requireLogin}>
        <IndexRoute component={Home}/>
        <Route path="dashboard" component={Home} />
        <Route path="applications" component={Applications}>
          <Route path="new" component={ApplicationNew} />
          <Route path=":appId" component={ApplicationDetail} />
        </Route>
        <Route path="settings" component={Settings}/>
        <Route path="devices" component={Devices}/>

        <Route path="user">
          <Route path="settings" component={UserSettings} />
        </Route>

        <Route path="loginSuccess" component={LoginSuccess}/>
        { /* Catch all route */ }
        <Route path="*" component={NotFound} status={404} />
      </Route>


    </Route>
  );
};
