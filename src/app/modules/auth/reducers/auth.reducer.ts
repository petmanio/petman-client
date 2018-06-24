import { AuthActions, AuthActionTypes } from '../actions/auth.actions';
import { createSelector } from '@ngrx/store';
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

export const getLoggedIn = (state: State) => state.loggedIn;
export const getUser = (state: State) => state.user;
export const getSelectedUserId = (state: State) => state.selectedUserId;
export const getSelectedUser = createSelector(getUser, getSelectedUserId, (user, userId) => {
  const businessUser = find(user ? user.businessUsers : [], u => u.id === userId);
  return businessUser || user;
});
