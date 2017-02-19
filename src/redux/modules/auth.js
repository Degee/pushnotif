const LOAD = 'auth/LOAD';
const LOAD_SUCCESS = 'auth/LOAD_SUCCESS';
const LOAD_FAIL = 'auth/LOAD_FAIL';
const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'auth/LOGIN_FAIL';
const LOGOUT = 'auth/LOGOUT';
const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'auth/LOGOUT_FAIL';

const FP = 'auth/FP';
const FP_SUCCESS = 'auth/FP_SUCCESS';
const FP_FAIL = 'auth/FP_FAIL';

const REG = 'auth/REG';
const REG_SUCCESS = 'auth/REG_SUCCESS';
const REG_FAIL = 'auth/REG_FAIL';

const initialState = {
  loaded: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.result.token);
      localStorage.setItem('user', action.result.user);
      return {
        ...state,
        loggingIn: false,
        user: action.result.user,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.error
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        user: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    case FP_SUCCESS:
    case FP_FAIL:
      return {
        ...state,
        forgottenPassword: action.result ? action.result : action.error,
        error: action.error ? true : false,
      };
    case REG_SUCCESS:
      localStorage.setItem('token', action.result.token);
      localStorage.setItem('user', action.result.user);
      localStorage.setItem('settings', action.result.settings);
      return {
        ...state,
        registration: action.result,
        user: action.result.user,
        token: action.result.token,
      };

    case REG_FAIL:
      return {
        ...state,
        registration: action.error,
      };

    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/loadAuth')
  };
}

export function login(email, password) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/users/login', {
      data: {
        email,
        password
      }
    })
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.get('/users/logout')
  };
}

export function forgottenPassword(email) {
  return {
    types: [FP, FP_SUCCESS, FP_FAIL],
    promise: (client) => client.post('/users/forgottenPassword', {
      data: { email }
    })
  };
}

export function register(email, password) {
  return {
    types: [REG, REG_SUCCESS, REG_FAIL],
    promise: (client) => client.post('/users', {
      data: { email, password }
    })
  };
}
