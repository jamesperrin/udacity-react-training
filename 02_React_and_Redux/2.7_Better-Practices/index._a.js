// Here's the commit with the changes made in this video.
// https://github.com/udacity/cd0547-React-Redux-TODO-GOALS-project/commit/240aea175f5ce5bf681a3447362354bff117109e

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
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';
const TOGGLE_GOAL = 'TOGGLE_GOAL';

// Here's the commit with the changes made in this video.
// https://github.com/udacity/cd0547-React-Redux-TODO-GOALS-project/commit/e060dc16ec86888762a56bd51a777790246cd597
function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.todo]);
    case REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.id);
    case TOGGLE_TODO:
      return state.map((todo) =>
        todo.id !== action.id ? todo : Object.assign({}, todo, { complete: !todo.complete }),
      );
    default:
      return state;
  }
}

// Here's the commit with the changes made in this video.
// https://github.com/udacity/cd0547-React-Redux-TODO-GOALS-project/commit/f6dd118d8754288e3b01871d9fb21312202bc20f
function goals(state = [], action) {
  switch (action.type) {
    case ADD_GOAL:
      return state.concat([action.goal]);
    case REMOVE_GOAL:
      return state.filter((goal) => goal.id !== action.id);
    case TOGGLE_GOAL:
      return state.map((goal) =>
        goal.id !== action.id ? goal : Object.assign({}, goal, { complete: !goal.complete }),
      );
    default:
      return state;
  }
}

// Here's the commit with the changes made in this video.
// https://github.com/udacity/cd0547-React-Redux-TODO-GOALS-project/commit/96bcbe3df2cebd44cf4d50a0e62fb35aeaa11011
function app(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action),
  };
}

const store = createStore(app);

store.subscribe(() => {
  console.log('The new state is: ', store.getState());
});

store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 0,
    name: 'Walk the dog',
    complete: false,
  },
});

store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 1,
    name: 'Wash the car',
    complete: false,
  },
});

store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 2,
    name: 'Go to the gym',
    complete: true,
  },
});

store.dispatch({
  type: REMOVE_TODO,
  id: 1,
});

store.dispatch({
  type: TOGGLE_TODO,
  id: 0,
});

store.dispatch({
  type: ADD_GOAL,
  goal: {
    id: 0,
    name: 'Learn Redux',
  },
});

store.dispatch({
  type: ADD_GOAL,
  goal: {
    id: 1,
    name: 'Lose 20 pounds',
  },
});

store.dispatch({
  type: REMOVE_GOAL,
  id: 0,
});
