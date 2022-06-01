import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, Observable, of, switchMap } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';
import {
  AuthActions,
  AuthActionsTypes,
  GetUsersError,
  GetUsersSuccess,
} from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private authService: AuthService,
    private effectActions: Actions
  ) {}

  getAllUsers: Observable<AuthActions> = createEffect(() =>
    this.effectActions.pipe(
      ofType(AuthActionsTypes.GET_USERS),
      mergeMap((action: AuthActions) => {
        return this.authService.getAllUsers().pipe(
          map((users) => {
            console.log(users);
            return new GetUsersSuccess(users);
          }),
          catchError((err) => of(new GetUsersError(err.message)))
        );
      })
    )
  );
}
