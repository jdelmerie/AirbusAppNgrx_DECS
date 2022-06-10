import { Action } from '@ngrx/store';
import { User } from 'src/app/model/user.model';
import { AuthActions, AuthActionsTypes } from '../actions/auth.actions';
import { AuthState, AuthStateEnum, initialState } from '../auth.states';

export function AuthReducer(
  state: AuthState = initialState,
  action: Action
): AuthState {
  switch (action.type) {
    case AuthActionsTypes.GET_USER:
      return { ...state, dataState: AuthStateEnum.LOADING };
    case AuthActionsTypes.GET_USER_SUCCESS:
      return {
        ...state,
        isAuth: true,
        dataState: AuthStateEnum.LOADED,
        user: (<AuthActions>action).payload,
      };
    case AuthActionsTypes.GET_USER_DENIED:
      return {
        ...state,
        isAuth: false,
        dataState: AuthStateEnum.DENIED,
      };
    case AuthActionsTypes.GET_USER_ERROR:
      return {
        ...state,
        dataState: AuthStateEnum.ERROR,
        error: (<AuthActions>action).payload,
      };
    case AuthActionsTypes.LOGOUT: {
      return { ...state, user: {} as User, isAuth: false };
    }

    default:
      return { ...state };
  }
}
