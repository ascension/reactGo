export const makeReducer = (initialState = {}, actionHandlers = {}) => {
  const ACTION_HANDLERS = { ...actionHandlers };

  function getActionHandlers() {
    return ACTION_HANDLERS;
  }

  function registerActionHandler(actionName, reducerFunc) {
    if (ACTION_HANDLERS[actionName]) {
      return false;
    }

    ACTION_HANDLERS[actionName] = reducerFunc;
    return true;
  }

  function reducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
  }

  function getReducer() {
    return reducer;
  }

  function registerAsyncActions(asyncActions, asyncActionHandlers) {
    const results = {};
    for (const actionHandler in asyncActionHandlers) {
      if (asyncActions[actionHandler]) {
        results[actionHandler] = registerActionHandler(asyncActions[actionHandler], asyncActionHandlers[actionHandler]);
      }
    }
  }

  return { getReducer, registerActionHandler, getActionHandlers, registerAsyncActions };
};
