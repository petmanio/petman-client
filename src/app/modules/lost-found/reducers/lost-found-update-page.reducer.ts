import { HttpErrorResponse } from '@angular/common/http';

import {
  SharedActionTypes,
  SharedActions
} from '@shared/actions/shared.actions';
import {
  LostFoundActions,
  LostFoundActionTypes
} from '@lost-found/actions/lost-found.actions';

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
  action: LostFoundActions | SharedActions
): State {
  switch (action.type) {
    case LostFoundActionTypes.UPDATE:
    case LostFoundActionTypes.DELETE:
      return { ...state, error: null, pending: true };

    case LostFoundActionTypes.UPDATE_SUCCESS:
    case LostFoundActionTypes.DELETE_SUCCESS:
      return { ...state, error: null, pending: false };

    case LostFoundActionTypes.UPDATE_FAILURE:
    case LostFoundActionTypes.DELETE_FAILURE:
      return { ...state, error: action.payload, pending: false };

    case SharedActionTypes.CLEAN_ERROR:
      return initialState;

    default:
      return state;
  }
}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
