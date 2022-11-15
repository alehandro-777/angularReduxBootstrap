import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUser } from '../state/user.selectors';
import { User } from '../features/login/user.model';
import { navigateTo } from '../state/navigation.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  user$ = this.store.select(selectUser);
  
  currentUser: User = {_id:0, name:"Guest"};

  constructor( private store: Store) {
    this.user$.subscribe(user => {
      this.currentUser = user;
    });
  }

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    /*
    if (this.currentUser._id > 0) {

      //TODO TODO TODO route access checks

      return true;

    } else {
      
      this.store.dispatch(navigateTo( {url: "/login", params:{ queryParams: { return: state.url } }  } ));
      return false;
    }
    */
    return true;
  }
  
}
