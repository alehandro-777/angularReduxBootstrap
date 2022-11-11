import { createSelector, createFeatureSelector } from '@ngrx/store';
import { User } from '../features/login/user.model';

export const selectUser = createFeatureSelector<User>('user');

export const selectCurrentUser = createSelector(
    selectUser,
  (state: User) => {
    return state;
  }
);