const GET = 'applications/GET';
const GET_SUCCESS = 'applications/GET_SUCCESS';
const GET_FAIL = 'applications/GET_FAIL';

const CREATE = 'applications/CREATE';
const CREATE_SUCCESS = 'applications/CREATE_SUCCESS';
const CREATE_FAIL = 'applications/CREATE_FAIL';

const SWITCH_STATUS = 'applications/SWITCH_STATUS';
const SWITCH_STATUS_SUCCESS = 'applications/SWITCH_STATUS_SUCCESS';
const SWITCH_STATUS_FAIL = 'applications/SWITCH_STATUS_FAIL';

const DELETE = 'applications/DELETE';
const DELETE_SUCCESS = 'applications/DELETE_SUCCESS';
const DELETE_FAIL = 'applications/DELETE_FAIL';

const initialState = {
  list: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_SUCCESS:
      const applications = action.result.applications;
      return {
        ...state,
        list: applications,
        loaded: true
      };
    case SWITCH_STATUS_SUCCESS: {
      const temp = [];
      state.list.forEach((app, key) => {
        if (app._id === action.result.app._id) {
          temp[key] = action.result.app;
        } else {
          temp[key] = state.list[key];
        }
      });
      return {
        ...state,
        list: temp
      };
    }
    case DELETE_SUCCESS: {
      const temp = state.list.filter(app => app._id !== action.id);
      return {
        ...state,
        list: temp
      };
    }
    default:
      return state;
  }
}

export function getApplications() {
  return {
    types: [GET, GET_SUCCESS, GET_FAIL],
    promise: (client) => client.get('/applications')
  };
}

export function getApplication(id) {
  return {
    types: [GET, GET_SUCCESS, GET_FAIL],
    promise: (client) => client.get('/application', id)
  };
}

export function createApplication(data) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    promise: (client) => client.post('/applications', {data})
  };
}

export function switchApplicationStatus(id, status) {
  return {
    types: [SWITCH_STATUS, SWITCH_STATUS_SUCCESS, SWITCH_STATUS_FAIL],
    promise: (client) => client.put(`/application/${id}`, {data: {isActive: !status}})
  };
}

export function deleteApplication(id) {
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAIL],
    id,
    promise: (client) => client.del(`/application/${id}`)
  };
}

export function areApplicationsLoaded(globalState) {
  return globalState.applications && globalState.applications.loaded;
}
