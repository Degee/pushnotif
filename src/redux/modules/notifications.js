const GET_BY_APP = 'notifications/GET_BY_APP';
const GET_BY_APP_SUCCESS = 'notifications/GET_BY_APP_SUCCESS';
const GET_BY_APP_FAIL = 'notifications/GET_BY_APP_FAIL';

const GET_SUMMARY = 'notifications/GET_SUMMARY';
const GET_SUMMARY_SUCCESS = 'notifications/GET_SUMMARY_SUCCESS';
const GET_SUMMARY_FAIL = 'notifications/GET_SUMMARY_FAIL';

const CREATE_BY_APP = 'notifications/CREATE_BY_APP';
const CREATE_BY_APP_SUCCESS = 'notifications/CREATE_BY_APP_SUCCESS';
const CREATE_BY_APP_FAIL = 'notifications/CREATE_BY_APP_FAIL';

const UPDATE_BY_APP = 'notifications/UPDATE_BY_APP';
const UPDATE_BY_APP_SUCCESS = 'notifications/UPDATE_BY_APP_SUCCESS';
const UPDATE_BY_APP_FAIL = 'notifications/UPDATE_BY_APP_FAIL';

const DELETE_NOTIF = 'notifications/DELETE_NOTIF';
const DELETE_NOTIF_SUCCESS = 'notifications/DELETE_NOTIF_SUCCESS';
const DELETE_NOTIF_FAIL = 'notifications/DELETE_NOTIF_FAIL';

const initialState = {
  notifications: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CREATE_BY_APP_SUCCESS:
      const tmp = state.notifications;
      tmp.push(action.result.notification);
      return {
        ...state,
        notifications: tmp
      }

    case UPDATE_BY_APP_SUCCESS:
      const temp = [];
      state.notifications.forEach((notification, key) => {
        if (notification._id === action.id) {
          temp[key] = action.result.notification;
        } else {
          temp[key] = state.notifications[key];
        }
      });
      return {
        ...state,
        notifications: temp
      }

    case GET_BY_APP_SUCCESS:
      return {
        ...state,
        notifications: action.result.notifications,
      }

    case GET_SUMMARY_SUCCESS:
      return {
        ...state,
        notifications: action.result.notifications,
        loaded: true
      }

    case DELETE_NOTIF_SUCCESS: {
      return {
        ...state,
        notifications: state.notifications.filter(dev => dev._id !== action.id)
      };
    }

    default:
      return state;
  }
}

export function getApplicationNotifications(applicationId) {
  return {
    types: [GET_BY_APP, GET_BY_APP_SUCCESS, GET_BY_APP_FAIL],
    promise: (client) => client.get(`/application/${applicationId}/notifications`)
  };
}

export function createNotification(applicationId, data) {
  return {
    types: [CREATE_BY_APP, CREATE_BY_APP_SUCCESS, CREATE_BY_APP_FAIL],
    promise: (client) => client.post(`/application/${applicationId}/notifications`, { data })
  };
}

export function updateNotification(applicationId, id, data) {
  return {
    types: [UPDATE_BY_APP, UPDATE_BY_APP_SUCCESS, UPDATE_BY_APP_FAIL],
    id,
    promise: (client) => client.put(`/application/${applicationId}/notification/${id}`, { data })
  };
}


export function deleteNotification({id, appId}) {
  return {
    types: [DELETE_NOTIF, DELETE_NOTIF_SUCCESS, DELETE_NOTIF_FAIL],
    id,
    promise: (client) => client.del(`/application/${appId}/notification/${id}`)
  };
}


export function getSummary() {
  return {
    types: [GET_SUMMARY, GET_SUMMARY_SUCCESS, GET_SUMMARY_FAIL],
    promise: (client) => client.get(`/summary`)
  };
}


export function isSummaryLoaded(globalState) {
  return globalState.notifications && globalState.notifications.loaded;
}
