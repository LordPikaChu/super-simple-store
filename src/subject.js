export function createSubject(value) {
  let currentValue = value;
  let listeners = [];

  function getValue() {
    return currentValue;
  }

  function next(nextValue) {
    if (nextValue !== currentValue) {
      currentValue = nextValue;

      notify();
    }
  }

  function notify() {
    listeners.forEach(listener => {
      if (listener instanceof Function) {
        listener(currentValue);
      }
    });
  }

  function subscribe(newListener) {
    listeners = [...listeners, newListener];
    newListener(currentValue);

    return function unsubscribe() {
      listeners = listeners.filter(listener => listener !== newListener);
    }
  }

  return {
    next,
    subscribe,
    getValue
  };
}
