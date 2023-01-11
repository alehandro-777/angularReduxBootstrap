import { createReducer, on } from '@ngrx/store';

import * as userActions from './user.actions';
import { Profile, Role, User, UsersPage, UsersState } from '../features/login/user.model';



export const initialState: UsersState = {
  selectedPage: 1,
  rolesSelector: [],
  profilesSelector:[],
  pageSize: 30,

};

export const user1Reducer = createReducer(
  initialState,
  on(userActions.fillProfilesSelectorOk, (state, action) => {
    return {
      ...state,
      profilesSelector: action.profiles
    };
  }),
  on(userActions.fillRolesSelectorOK, (state, action) => {
    return {
      ...state,
      rolesSelector: action.roles
    };
  }),
  on(userActions.getUserByIdOk, (state, action) => {
    return {
      ...state,
      selectedUser: action.user
    };
  }),
  on(userActions.editUserOk, (state, action) => {
    return {
      ...state,
      selectedUser: action.user
    };
  }),
  on(userActions.loadUserPageOk, (state, action) => {
    return {
      ...state,
      usersPage: action.userPage
    };
  }),
  
);