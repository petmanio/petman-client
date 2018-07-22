import { HttpErrorResponse } from '@angular/common/http';

import { LostFoundActions, LostFoundActionTypes } from '@lost-found/actions/lost-found.actions';

export interface State {
  error: HttpErrorResponse;
  pending: boolean;
}

export const initialState: State = {
  error: null,
  pending: false,
};

export function reducer(state = initialState, action: LostFoundActions): State {
  switch (action.type) {
    case LostFoundActionTypes.LIST:
    case LostFoundActionTypes.MORE:
      return { ...state, error: null, pending: true };

    case LostFoundActionTypes.LIST_SUCCESS:
    case LostFoundActionTypes.MORE_SUCCESS:
      return { ...state, error: null, pending: false };

    case LostFoundActionTypes.LIST_FAILURE:
    case LostFoundActionTypes.MORE_FAILURE:
      return { ...state, error: action.payload, pending: false };

    default:
      return state;
  }
}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
