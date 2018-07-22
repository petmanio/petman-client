import { HttpErrorResponse } from '@angular/common/http';

import { AdoptActions, AdoptActionTypes } from '@adopt/actions/adopt.actions';

export interface State {
  error: HttpErrorResponse;
  pending: boolean;
}

export const initialState: State = {
  error: null,
  pending: false,
};

export function reducer(state = initialState, action: AdoptActions): State {
  switch (action.type) {
    case AdoptActionTypes.LIST:
    case AdoptActionTypes.MORE:
      return { ...state, error: null, pending: true };

    case AdoptActionTypes.LIST_SUCCESS:
    case AdoptActionTypes.MORE_SUCCESS:
      return { ...state, error: null, pending: false };

    case AdoptActionTypes.LIST_FAILURE:
    case AdoptActionTypes.MORE_FAILURE:
      return { ...state, error: action.payload, pending: false };

    default:
      return state;
  }
}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
