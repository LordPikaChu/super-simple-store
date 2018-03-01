import { createSubject } from './subject.js';
import { initializeStore } from './actions.js';

export function createStore(reducer) {
  const state = createSubject(void 0);
  const subscribers = [];

  function getState() {
    return state.getValue();
  }

  function dispatch(action) {
    state.next(reducer(state.getValue(), action));
  }

  function select(selector) {
    const subject = createSubject(selector(state.getValue()));

    state.subscribe((nextState) => {
      subject.next(selector(nextState));
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
