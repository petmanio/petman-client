import { HttpErrorResponse } from '@angular/common/http';

import { WalkerActions, WalkerActionTypes } from '@walker/actions/walker.actions';

export interface State {
  error: HttpErrorResponse;
  pending: boolean;
}

export const initialState: State = {
  error: null,
  pending: false,
};

export function reducer(state = initialState, action: WalkerActions): State {
  switch (action.type) {
    case WalkerActionTypes.CREATE:
      return { ...state, error: null, pending: true };

    case WalkerActionTypes.CREATE_SUCCESS:
      return { ...state, error: null, pending: false };

    case WalkerActionTypes.CREATE_FAILURE:
      return { ...state, error: action.payload, pending: false };

    default:
      return state;
  }
}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
