const SAVE = 'settings/SAVE';
const SAVE_SUCCESS = 'settings/SAVE_SUCCESS';
const SAVE_FAIL = 'settings/SAVE_FAIL';

const SAVE_USER = 'settings/SAVE_USER';
const SAVE_USER_SUCCESS = 'settings/SAVE_USER_SUCCESS';
const SAVE_USER_FAIL = 'settings/SAVE_USER_FAIL';

const GET = 'settings/GET';
const GET_SUCCESS = 'settings/GET_SUCCESS';
const GET_FAIL = 'settings/GET_FAIL';

const initialState = {
  settings: null,
  loaded: false,
  saveError: ''
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SAVE:
      return state;
    case SAVE_SUCCESS:
      return {
        ...state,
        settings: action.result.settings,
        saveError: '',
      };
    case SAVE_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        saveError: action.error
      } : state;

    case GET_SUCCESS:
      return {
        ...state,
        settings: action.result.settings,
        loaded: true,
      };

    case SAVE_USER_FAIL:
      return {
        ...state,
        saveError: action.error
      };

    case GET_FAIL:
      return state;
    default:
      return state;
  }
}

export function saveConfig(data) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    promise: (client) => client.post('/user/me/apiConfig', {
      data
    })
  };
}

export function getConfig() {
  return {
    types: [GET, GET_SUCCESS, GET_FAIL],
    promise: (client) => client.get('/user/me/apiConfig')
  };
}

export function isLoaded(globalState) {
  return globalState.settings && globalState.settings.loaded;
}

export function saveUser(data) {
  return {
    types: [SAVE_USER, SAVE_USER_SUCCESS, SAVE_USER_FAIL],
    promise: (client) => client.put('/user/me', { data })
  };
}

