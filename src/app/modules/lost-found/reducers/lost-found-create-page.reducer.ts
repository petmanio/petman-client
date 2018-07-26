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
    case LostFoundActionTypes.CREATE:
      return { ...state, error: null, pending: true };

    case LostFoundActionTypes.CREATE_SUCCESS:
      return { ...state, error: null, pending: false };

    case LostFoundActionTypes.CREATE_FAILURE:
      return { ...state, error: action.payload, pending: false };

    case SharedActionTypes.CLEAN_ERROR:
      return initialState;

    default:
      return state;
  }
}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
