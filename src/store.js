import { createSubject } from './subject.js';
import { initializeStore } from './actions.js';

export function createStore(reducer) {
  const state = createSubject(void 0);

  function getState() {
    return state.getValue();
  }

  function dispatch(action) {
    const nextState = reducer(getState(), action);
    state.next(nextState);
  }

  function select(selector) {
    const initialValue = selector(getState());
    const subject = createSubject(initialValue);

    state.subscribe((nextState) => {
      const nextValue = selector(nextState);
      subject.next(nextValue);
    });

    return subject;
  }

  dispatch(initializeStore());

  return {
    getState,
    dispatch,
    select
  };
}
