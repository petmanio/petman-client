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
    case SitterActionTypes.CREATE:
      return { ...state, error: null, pending: true };

    case SitterActionTypes.CREATE_SUCCESS:
      return { ...state, error: null, pending: false };

    case SitterActionTypes.CREATE_FAILURE:
      return { ...state, error: action.payload, pending: false };

    case SharedActionTypes.CLEAN_ERROR:
      return initialState;

    default:
      return state;
  }
}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
