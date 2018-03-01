import * as ActionTypes from './action-types';

export function initializeStore() {
  return { type: ActionTypes.INITIALIZE };
}
