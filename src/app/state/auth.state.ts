export enum AuthActionsTypes {
  GET_USER = '[User] Get Users',
  GET_USER_SUCCESS = '[User] Get Users Success',
  GET_USER_ERROR = '[User] Get Users Error',
}

export interface ActionEvent {
  type: AuthActionsTypes;
  payload?: any;
}

export enum AuthDataStateEnum {
  LOADING, //chargement en cours
  LOADED, //chargé
  ERROR, //erreur
}

export interface AuthDataState<T> {
  dataState?: AuthDataStateEnum;
  data?: T;
  error?: string;
}
