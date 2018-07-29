import { HttpErrorResponse } from '@angular/common/http';

import {
  SharedActionTypes,
  SharedActions
} from '@shared/actions/shared.actions';
import {
  SitterActions,
  SitterActionTypes
} from '@sitter/actions/sitter.actions';

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
  action: SitterActions | SharedActions
): State {
  switch (action.type) {
    case SitterActionTypes.UPDATE:
    case SitterActionTypes.DELETE:
      return { ...state, error: null, pending: true };

    case SitterActionTypes.UPDATE_SUCCESS:
    case SitterActionTypes.DELETE_SUCCESS:
      return { ...state, error: null, pending: false };

    case SitterActionTypes.UPDATE_FAILURE:
    case SitterActionTypes.DELETE_FAILURE:
      return { ...state, error: action.payload, pending: false };

    case SharedActionTypes.CLEAN_ERROR:
      return initialState;

    default:
      return state;
  }
}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
