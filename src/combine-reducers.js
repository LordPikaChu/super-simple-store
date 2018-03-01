export function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers);

  return function combination(state = {}, action) {
    const nextState = {};
    let hasChanged = false;

    reducerKeys.forEach(key => {
      const reducer = reducers[key];
      const previousStateforKey = state[key];
      const nextStateforKey = reducer(previousStateforKey, action);

      nextState[key] = nextStateforKey;
      hasChanged = hasChanged || nextStateforKey !== previousStateforKey;
    });

    return hasChanged ? nextState : state;
  }
}
