import { createStore } from '../store';
import * as StoreActionTypes from '../action-types';

import { userReducer, USER_DEFAULT_STATE } from './helpers/reducers';
import * as ActionTypes from './action-types';
import { fakeAction } from './actions';

describe('createStore', () => {

  it('exposes public methods', () => {
    const store = createStore(userReducer);
    const methods = Object.keys(store);

    expect(methods.length).toBe(3);
    expect(methods).toContain('getState');
    expect(methods).toContain('select');
    expect(methods).toContain('dispatch');
  });

  it('calls reducer function when initialized', () => {
    let passedState;
    let passedAction;
    const spyReducer = (state, action) => {
      passedState = state;
      passedAction = action;

      return state;
    };
    const store = createStore(reducer);
    
    spyOn(spyReducer);
    expect(spyReducer).toHaveBeenCalled();
    expect(passedState).toBe(void 0);
    expect(passedAction.type).toEqual(StoreActionTypes.INITIALIZE);
  });

  it('collects initial state from reducers', () => {
    const store = createStore(userReducer);

    expect(store.getState()).toEqual({...USER_DEFAULT_STATE});
  });

  it('passed previous state and action to reducer on dispatch', () => {
    const store = createStore(userReducer);
    const previousState = store.getState();
    const action = fakeAction();

    store.dispatch(action);
    
    expect(spyReducer).toHaveBeenCalledWith(previousState, action);
  });

});
