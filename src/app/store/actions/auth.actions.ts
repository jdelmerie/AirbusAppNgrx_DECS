import { Action } from '@ngrx/store';
import { User } from 'src/app/model/user.model';

export enum AuthActionsTypes {
  GET_USERS = '[User] Get Users',
  GET_USERS_SUCCESS = '[User] Get Users Success',
  GET_USERS_ERROR = '[User] Get Users Error',
}

export class GetUsers implements Action {
  type: AuthActionsTypes = AuthActionsTypes.GET_USERS;
  constructor(public payload: any) {
    console.log('dans les actions');
  }
}

export class GetUsersSuccess implements Action {
  type: AuthActionsTypes = AuthActionsTypes.GET_USERS_SUCCESS;
  constructor(public payload: User[]) {}
}

export class GetUsersError implements Action {
  type: AuthActionsTypes = AuthActionsTypes.GET_USERS_ERROR;
  constructor(public payload: string) {}
}

export type AuthActions = GetUsers | GetUsersSuccess | GetUsersError;
