import { makeReducer } from 'util/redux';
import { createSelector } from 'reselect';

const initialState = { entities: {} };
const notificationReducer = makeReducer(initialState);
export default notificationReducer.getReducer();

// ------------------------------------
// Constants
// ------------------------------------
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const DELETE_ALL_NOTIFICATIONS = 'DELETE_ALL_NOTIFICATIONS';
export const DELETE_NOTIFICATION = 'DELETE_NOTIFICATION';

// ------------------------------------
// Selectors
// ------------------------------------
export const getNotifications = state => state.entities.notifications;

notificationReducer.registerActionHandler(ADD_NOTIFICATION, (state, { payload }) => {
  const notifications = state.entities;
  return { ...state, entities: { ...notifications, ...payload } };
});

notificationReducer.registerActionHandler(DELETE_ALL_NOTIFICATIONS, (state, action) => {
  return state;
});

notificationReducer.registerActionHandler(DELETE_NOTIFICATION, (state, action) => {
  return state;
});

export const getVisibleNotifications = createSelector([getNotifications], notifications => {
  return Object.values(notifications).filter(x => x.visible);
});
