import { HttpErrorResponse } from '@angular/common/http';

import { AuthActions, AuthActionTypes } from '@auth/actions/auth.actions';

export interface State {
  error: HttpErrorResponse;
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

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
