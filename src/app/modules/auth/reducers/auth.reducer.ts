import { createSelector } from '@ngrx/store';
import { find } from 'lodash';

import { UserDto } from '@petman/common';

import { AuthActions, AuthActionTypes } from '@auth/actions/auth.actions';
import { UserActionTypes, UserActions } from '@user/actions/user.actions';

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

export function reducer(state = initialState, action: AuthActions | UserActions): State {
  switch (action.type) {

    case UserActionTypes.UPDATE_SUCCESS:
      if (action.payload.id === state.user.id) {
        return { ...state, user: action.payload };
      } else {
        // TODO: implement state update for business users
        return { ...state };
      }

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
