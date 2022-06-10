import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, Observable, of, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import {
  AuthActions,
  AuthActionsTypes,
  GetUserDenied,
  GetUserError,
  GetUserSuccess,
} from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private authService: AuthService,
    private effectActions: Actions
  ) {}

  login: Observable<AuthActions> = createEffect(() =>
    this.effectActions.pipe(
      ofType(AuthActionsTypes.GET_USER),
      mergeMap((action: AuthActions) => {
        return this.authService
          .getUser(action.payload.email, action.payload.pwd)
          .pipe(
            map((user) => {
              return (Object.keys(user).length == 0) ? new GetUserDenied(null) : new GetUserSuccess(user);
            }),
            catchError((err) => of(new GetUserError(err.message)))
          );
      })
    )
  );

  logout: Observable<any> = createEffect(() =>
    this.effectActions.pipe(
      ofType(AuthActionsTypes.LOGOUT),
      tap(() => {
        return localStorage.removeItem('userConnected');
      }),
      map(() => {
        return { type: 'NO_ACTION' };
      })
    )
  );
}
