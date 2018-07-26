import { HttpErrorResponse } from '@angular/common/http';

import {
  SharedActionTypes,
  SharedActions
} from '@shared/actions/shared.actions';
import {
  WalkerActions,
  WalkerActionTypes
} from '@walker/actions/walker.actions';

export interface State {
  error: HttpErrorResponse;
  pending: boolean;
}

export const initialState: State = {
  error: null,
  pending: false
};

export function reducer(
  state = initialState,
  action: WalkerActions | SharedActions
): State {
  switch (action.type) {
    case WalkerActionTypes.UPDATE:
    case WalkerActionTypes.DELETE:
      return { ...state, error: null, pending: true };

    case WalkerActionTypes.UPDATE_SUCCESS:
    case WalkerActionTypes.DELETE_SUCCESS:
      return { ...state, error: null, pending: false };

    case WalkerActionTypes.UPDATE_FAILURE:
    case WalkerActionTypes.DELETE_FAILURE:
      return { ...state, error: action.payload, pending: false };

    case SharedActionTypes.CLEAN_ERROR:
      return initialState;

    default:
      return state;
  }
}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
