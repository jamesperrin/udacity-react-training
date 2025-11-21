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
// Here's the commit with the changes made in this video.
// https://github.com/udacity/cd0547-React-Redux-TODO-GOALS-project/commit/e060dc16ec86888762a56bd51a777790246cd597
function todos(state = [], action) {
  /*
    if (action.type === 'ADD_TODO') {
      return state.concat([action.todo]);
    } else if (action.type === 'REMOVE_TODO') {
      return state.filter((todo) => todo.id !== action.id);
    } else if (action.type === 'TOGGLE_TODO') {
      return state.map((todo) => (todo.id !== action.id ? todo : Object.assign({}, todo, { complete: !todo.complete })));
    } else {
      return state;
    }
  */

  // Refactored to Switch statement
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.todo]);
    case 'REMOVE_TODO':
      return state.filter((todo) => todo.id !== action.id);
    case 'TOGGLE_TODO':
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
    case 'ADD_GOAL':
      return state.concat([action.goal]);
    case 'REMOVE_GOAL':
      return state.filter((goal) => goal.id !== action.id);
    case 'TOGGLE_GOAL':
      return state.map((goal) =>
        goal.id !== action.id ? goal : Object.assign({}, goal, { complete: !goal.complete }),
      );
    default:
      return state;
  }
}

function createIdGenerator() {
  let current = 1;
  return () => {
    return current++;
  };
}

const getId = createIdGenerator();

const store = createStore(todos);

store.subscribe(() => {
  console.log('The new state is: ', store.getState());
});

store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: getId(),
    name: 'Learn Redux',
    complete: false,
  },
});

store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: getId(),
    name: 'Learn React',
    complete: false,
  },
});

store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: crypto.randomUUID(),
    name: 'Learn Next.js',
    complete: false,
  },
});
