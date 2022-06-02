import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import {
  AuthActions,
  AuthActionsTypes,
  GetUserError,
  GetUserSuccess,
} from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private authService: AuthService,
    private effectActions: Actions
  ) {}

  getAllUsers: Observable<AuthActions> = createEffect(() =>
    this.effectActions.pipe(
      ofType(AuthActionsTypes.GET_USER),
      mergeMap((action: AuthActions) => {
        return this.authService
          .getUser(action.payload.email, action.payload.pwd)
          .pipe(
            map((users) => {
              console.log(users)
              return new GetUserSuccess(users);
            }),
            catchError((err) => of(new GetUserError(err.message)))
          );
      })
    )
  );
}
