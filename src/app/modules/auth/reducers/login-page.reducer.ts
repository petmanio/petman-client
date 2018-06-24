import { HttpErrorResponse } from '@angular/common/http';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AuthActions, AuthActionTypes } from '@auth/actions/auth.actions';

export interface State {
  error: HttpErrorResponse | null;
  pending: boolean;
}

export const initialState: State = {
  error: null,
  pending: false,
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.FB_LOGIN:
      return { ...state, error: null, pending: true };

    case AuthActionTypes.CLEAR_ERROR:
    case AuthActionTypes.FB_LOGIN_SUCCESS:
      return { ...state, error: null, pending: false };

    case AuthActionTypes.FB_LOGIN_FAILURE:
      return { ...state, error: action.payload, pending: false };

    default:
      return state;
  }
}

export const selectState = createFeatureSelector<State>('auth.loginPage');

export const getError = createSelector(selectState, state => state.error);
export const getPending = createSelector(selectState, state => state.pending);
