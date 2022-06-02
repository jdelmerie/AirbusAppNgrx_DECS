import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../auth.states';

export const checkLogin = createSelector(
  createFeatureSelector('authState'),
  (state: AuthState) => {
      console.log("dans le selector")
    // state.users.forEach((u) => {
    //   if (u.email == 'airbus@fms.com' && u.pwd == '123') {
    //     state.isAuth = true;
    //   }
    // });
    return state.isAuth;
  }
);
