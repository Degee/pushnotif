const GET = 'devices/GET';
const GET_SUCCESS = 'devices/GET_SUCCESS';
const GET_FAIL = 'devices/GET_FAIL';

const GET_BY_APP = 'devices/GET_BY_APP';
const GET_BY_APP_SUCCESS = 'devices/GET_BY_APP_SUCCESS';
const GET_BY_APP_FAIL = 'devices/GET_BY_APP_FAIL';


const DELETE_DEVICE = 'devices/DELETE_DEVICE';
const DELETE_DEVICE_SUCCESS = 'devices/DELETE_DEVICE_SUCCESS';
const DELETE_DEVICE_FAIL = 'devices/DELETE_DEVICE_FAIL';

const initialState = {
  devices: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET:
      return state;
    case GET_SUCCESS:
      return {
        ...state,
        devices: action.result.devices,
      };
    case GET_BY_APP_SUCCESS:
      return {
        ...state,
        devices: action.result.devices,
      };
    case DELETE_DEVICE_SUCCESS: {
      return {
        ...state,
        devices: state.devices.filter(dev => dev._id !== action.id)
      };
    }
    default:
      return state;
  }
}

export function getDevices() {
  return {
    types: [GET, GET_SUCCESS, GET_FAIL],
    promise: (client) => client.get('/devices')
  };
}

export function getApplicationDevices(applicationId) {
  return {
    types: [GET_BY_APP, GET_BY_APP_SUCCESS, GET_BY_APP_FAIL],
    promise: (client) => client.get(`/application/${applicationId}/devices`)
  };
}

export function deleteDevice({id, appId}) {
  return {
    types: [DELETE_DEVICE, DELETE_DEVICE_SUCCESS, DELETE_DEVICE_FAIL],
    id,
    promise: (client) => client.del(`/application/${appId}/device/${id}`)
  };
}
