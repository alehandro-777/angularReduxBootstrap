import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import {
  login
} from '../../state/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string = "name@example.com";
  password: string = "password";
 
  constructor( private store: Store) { }

  ngOnInit(): void {
  }
  onLogin() { 
    //console.log(this.username)
    this.store.dispatch(login({ username: this.username,  password: this.password}));
  }
}
