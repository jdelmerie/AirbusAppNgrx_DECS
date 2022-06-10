import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../auth.states';

export const selectIsConnected = createSelector(
  createFeatureSelector('authState'),  
  (state: AuthState) => {
    return state.isAuth;
  }
);