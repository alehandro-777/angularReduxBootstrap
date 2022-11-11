import { createReducer, on } from '@ngrx/store';

import * as userActions from './user.actions';
import { User } from '../features/login/user.model';

export const initialState: User= {
    _id:0,
    name: "Guest"
};

export const userReducer = createReducer(
  initialState,
  on(userActions.loginOk, (state, { currentUser }) => currentUser),
  on(userActions.logOutOk, (state, {  }) => initialState),
  
);