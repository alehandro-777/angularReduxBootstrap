import { createSelector, createFeatureSelector } from '@ngrx/store';
import { User, UsersState } from '../features/login/user.model';

export const selectUsersState = createFeatureSelector<UsersState>('user1');

export const selectUsersPage = createSelector(
    selectUsersState,
  (state: UsersState) => {
    return state;
  }
);