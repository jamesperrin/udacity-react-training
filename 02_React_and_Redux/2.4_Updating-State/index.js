// Library Code
function createStore(reducer) {
  /**
   * The store should have four parts
   * 1. The state.
   * 2. Get the state.
   * 3. Listen to changes on the state
   * 4. Update the state.
   */

  // 1. The state.
  let state;
  let listeners = [];

  // 2. Get the state.
  const getState = () => state;

  // 3. Listen to changes on the state
  const subscribe = (listener) => {
    listeners.push(listener);

    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  // 4. Update the state.
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  return {
    getState,
    subscribe,
    dispatch,
  };
}

// App Code - Reducer function
function todos(state = [], action) {
  if (action.type === 'ADD_TODO') {
    return state.concat([action.todo]);
  }

  return state;
}
