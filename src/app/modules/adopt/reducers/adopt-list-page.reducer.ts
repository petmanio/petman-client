import { HttpErrorResponse } from '@angular/common/http';

import { SharedActions, SharedActionTypes } from '@shared/actions/shared.actions';
import { AdoptActions, AdoptActionTypes } from '@adopt/actions/adopt.actions';

export interface State {
  error: HttpErrorResponse;
  pending: boolean;
  showLoader: boolean;
}

export const initialState: State = {
  error: null,
  pending: false,
  showLoader: null
};

export function reducer(state = initialState, action: AdoptActions | SharedActions): State {
  switch (action.type) {
    case AdoptActionTypes.LIST:
      return { ...state, showLoader: true, error: null, pending: true };

    case AdoptActionTypes.MORE:
      return { ...state, error: null, pending: true };

    case AdoptActionTypes.LIST_SUCCESS:
    case AdoptActionTypes.MORE_SUCCESS:
      return { ...state, showLoader: false, error: null, pending: false };

    case AdoptActionTypes.LIST_FAILURE:
    case AdoptActionTypes.MORE_FAILURE:
      return { ...state, showLoader: false, error: action.payload, pending: false };

    case SharedActionTypes.CLEAN_ERROR:
      return initialState;

    default:
      return state;
  }
}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
export const getShowLoader = (state: State) => state.showLoader;
