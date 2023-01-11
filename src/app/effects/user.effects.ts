import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap, switchMap } from 'rxjs/operators';
import { UserService } from '../features/login/user.service';

import * as userActions from '../state/auth.actions';
import * as user1Actions from '../state/user.actions';

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

  loadUsersPage$ = createEffect( ()=>
    this.actions$.pipe(
      ofType(user1Actions.loadUserPage),
      switchMap((action) => this.userService.loadPage( action.skip, action.limit )),
      map(res => ( user1Actions.loadUserPageOk({userPage: res})) ),
      catchError((error) => of(user1Actions.loadUserPageError({error})))
    )
  );

  getById$ = createEffect( ()=>
    this.actions$.pipe(
      ofType(user1Actions.getUserById),
      switchMap((action) => this.userService.getById( action.id )),
      map(res => ( user1Actions.getUserByIdOk({user: res.data})) ),
      catchError((error) => of(user1Actions.getUserByIdError({error})))
    )
  );

  edit$ = createEffect( ()=>
    this.actions$.pipe(
      ofType(user1Actions.editUser),
      switchMap((action) => this.userService.update( action.user )),
      map(res => ( user1Actions.getUserByIdOk({user: res.data})) ),
      catchError((error) => of(user1Actions.getUserByIdError({error})))
    )
  );

  create$ = createEffect( ()=>
  this.actions$.pipe(
    ofType(user1Actions.createUser),
    switchMap((action) => this.userService.create( action.user )),
    map(res => ( user1Actions.getUserByIdOk({user: res.data})) ),
    catchError((error) => of(user1Actions.getUserByIdError({error})))
  )
);

fillRolesSelector$ = createEffect( ()=>
this.actions$.pipe(
  ofType(user1Actions.fillRolesSelector),
  switchMap((action) => this.userService.getAllRoles(  )),
  map(res => ( user1Actions.fillRolesSelectorOK({ roles: res})) ),
  catchError((error) => of(user1Actions.getUserByIdError({error})))
)
);

fillProfilesSelector$ = createEffect( ()=>
this.actions$.pipe(
  ofType(user1Actions.fillProfilesSelector),
  switchMap((action) => this.userService.getAllProfiles(  )),
  map(res => ( user1Actions.fillProfilesSelectorOk({ profiles: res })) ),
  catchError((error) => of(user1Actions.getUserByIdError({error})))
)
);



  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}
}