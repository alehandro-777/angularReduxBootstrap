import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { navigateTo } from '../state/navigation.actions';
import * as userActions from '../state/user.actions';
import { tap } from 'rxjs/operators';

@Injectable()
export class NavigateEffects {

  route$ = createEffect(() =>
    this.actions$.pipe(
      ofType(navigateTo),
      tap((props) => {
        if (props.params) {
          this.router.navigate([props.url, props.params])
        } else {
          this.router.navigate([props.url])
        }
      }
      
      
      )        
  )
  , { dispatch: false }
  );

  loginok$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loginOk),
      tap((props) => this.router.navigate(["/"]))        
  )
  , { dispatch: false }
  );  


  logoutok$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.logOutOk),
      tap((props) => this.router.navigate(["/login"]))        
  )
  , { dispatch: false }
  );  



  constructor(
    private actions$: Actions,
    private router: Router
  ) {}
}