import { Action } from '@ngrx/store';
import { AuthActions, AuthActionsTypes } from '../actions/auth.actions';
import { AuthState, AuthStateEnum, initialState } from '../auth.states';

export function AuthReducer(
  state: AuthState = initialState,
  action: Action
): AuthState {
  switch (action.type) {
    case AuthActionsTypes.GET_USERS:
      console.log('dans les reducteur');
      return { ...state, dataState: AuthStateEnum.LOADING };
    case AuthActionsTypes.GET_USERS_SUCCESS:
      console.log('dans les reducteur success');
      return {
        ...state,
        dataState: AuthStateEnum.LOADED,
        users: (<AuthActions>action).payload,
      };
    case AuthActionsTypes.GET_USERS_ERROR:
      console.log('dans les reducteur ERROR');
      return {
        ...state,
        dataState: AuthStateEnum.ERROR,
        error: (<AuthActions>action).payload,
      };

    default:
      return { ...state };
  }
}
