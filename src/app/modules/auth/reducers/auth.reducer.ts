import { AuthActions, AuthActionTypes } from '../actions/auth.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { find } from 'lodash';

import { UserDto } from '@petman/common';

export interface State {
  loggedIn: boolean;
  user: UserDto;
  selectedUserId: number;
}

export const initialState: State = {
  loggedIn: false,
  user: null,
  selectedUserId: null
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {

    case AuthActionTypes.USER_SUCCESS:
      return { ...state, loggedIn: true, user: action.payload };

    case AuthActionTypes.CHANGE_USER:
      return { ...state, selectedUserId: action.payload };

    case AuthActionTypes.LOGOUT:
      return { ...initialState };

    default:
      return state;
  }
}

export const selectState = createFeatureSelector<State>('auth');

export const getUser = createSelector(selectState, state => state.user);
export const getLoggedIn = createSelector(selectState, state => state.loggedIn);
export const getSelectedUserId = createSelector(selectState, state => state.selectedUserId);
export const getSelectedUser = createSelector(getUser, getSelectedUserId, (user, userId) => {
  const businessUser = find(user ? user.businessUsers : [], u => u.id === userId);
  return businessUser || user;
});
