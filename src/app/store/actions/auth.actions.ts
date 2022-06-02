import { Action } from '@ngrx/store';
import { User } from 'src/app/model/user.model';

export enum AuthActionsTypes {
  GET_USER = '[User] Get Users',
  GET_USER_SUCCESS = '[User] Get Users Success',
  GET_USER_ERROR = '[User] Get Users Error',
  LOGOUT = '[User] Logout',
}

export class GetUser implements Action {
  type: AuthActionsTypes = AuthActionsTypes.GET_USER;
  constructor(public payload: any) {}
}

export class GetUserSuccess implements Action {
  type: AuthActionsTypes = AuthActionsTypes.GET_USER_SUCCESS;
  constructor(public payload: User) {}
}

export class GetUserError implements Action {
  type: AuthActionsTypes = AuthActionsTypes.GET_USER_ERROR;
  constructor(public payload: string) {}
}

export class Logout implements Action {
  type: AuthActionsTypes = AuthActionsTypes.LOGOUT;
  constructor(public payload: string) {}
}

export type AuthActions = GetUser | GetUserSuccess | GetUserError | Logout;
