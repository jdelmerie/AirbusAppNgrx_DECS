import { User } from '../model/user.model';

export enum AuthStateEnum {
  LOADING = 'Loading', //chargement en cours
  LOADED = 'Loaded', //chargé
  ERROR = 'Error', //erreur
}

export interface AuthState {
  isAuth: boolean;
  user: User;
  error: string | null;
  dataState: AuthStateEnum;
}

export const initialState: AuthState = {
  isAuth: false,
  user: new User(0, '', '', []),
  error: '',
  dataState: AuthStateEnum.LOADING,
};
