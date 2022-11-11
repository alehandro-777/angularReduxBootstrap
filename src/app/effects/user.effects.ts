import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { UserService } from '../features/login/user.service';

import * as userActions from '../state/user.actions';

@Injectable()
export class UserEffects {
 
  logins$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userActions.login),
        exhaustMap(action =>
          this.userService.login(action.username, action.username).pipe(
            map(currentUser => (userActions.loginOk({ currentUser }))),
            catchError(error => of(userActions.loginFail({ error })))
          )
        )
        // Errors are handled and it is safe to disable resubscription
      ),
    { useEffectsErrorHandler: false }
  ); 

  logouts$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userActions.logOut),
        exhaustMap( () =>
          this.userService.logout().pipe(
            map( () => (userActions.logOutOk())),
            catchError(error => of(userActions.logOutFail({ error })))
          )
        )
        // Errors are handled and it is safe to disable resubscription
      ),
    { useEffectsErrorHandler: false }
  );  

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}
}