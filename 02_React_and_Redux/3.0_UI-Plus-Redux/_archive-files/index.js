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
const actions = {
  ADD_TODO: 'ADD_TODO',
  REMOVE_TODO: 'REMOVE_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO',
  ADD_GOAL: 'ADD_GOAL',
  REMOVE_GOAL: 'REMOVE_GOAL',
  TOGGLE_GOAL: 'TOGGLE_GOAL',
};

function addTodoAction(todo) {
  return {
    type: actions.ADD_TODO,
    todo,
  };
}

function removeTodoAction(id) {
  return {
    type: actions.REMOVE_TODO,
    id,
  };
}

function toggleTodoAction(id) {
  return {
    type: actions.TOGGLE_TODO,
    id,
  };
}

function addGoalAction(goal) {
  return {
    type: actions.ADD_GOAL,
    goal,
  };
}

function removeGoalAction(id) {
  return {
    type: actions.REMOVE_GOAL,
    id,
  };
}

function toggleGoalAction(id) {
  return {
    type: actions.TOGGLE_GOAL,
    id,
  };
}

// Here's the commit with the changes made in this video.
function todos(state = [], action) {
  switch (action.type) {
    case actions.ADD_TODO:
      return state.concat([action.todo]);
    case actions.REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.id);
    case actions.TOGGLE_TODO:
      return state.map((todo) =>
        todo.id !== action.id ? todo : Object.assign({}, todo, { complete: !todo.complete }),
      );
    default:
      return state;
  }
}

// Here's the commit with the changes made in this video.
function goals(state = [], action) {
  switch (action.type) {
    case actions.ADD_GOAL:
      return state.concat([action.goal]);
    case actions.REMOVE_GOAL:
      return state.filter((goal) => goal.id !== action.id);
    case actions.TOGGLE_GOAL:
      return state.map((goal) =>
        goal.id !== action.id ? goal : Object.assign({}, goal, { complete: !goal.complete }),
      );
    default:
      return state;
  }
}

// Here's the commit with the changes made in this video.
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

// store.dispatch(
//   addTodoAction({
//     id: 0,
//     name: 'Walk the dog',
//     complete: false,
//   }),
// );

// store.dispatch(
//   addTodoAction({
//     id: 1,
//     name: 'Wash the car',
//     complete: false,
//   }),
// );

// store.dispatch(
//   addTodoAction({
//     id: 2,
//     name: 'Go to the gym',
//     complete: true,
//   }),
// );

// store.dispatch(removeTodoAction(1));

// store.dispatch(toggleTodoActionTodoAction(1));

// store.dispatch(
//   addGoalAction({
//     id: 0,
//     name: 'Learn Redux',
//   }),
// );

// store.dispatch(
//   addGoalAction({
//     id: 1,
//     name: 'Lose 20 pounds',
//   }),
// );

// store.dispatch(removeGoalAction(1));
