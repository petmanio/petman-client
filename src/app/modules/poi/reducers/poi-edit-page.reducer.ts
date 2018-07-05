import { HttpErrorResponse } from '@angular/common/http';

import { PoiActions, PoiActionTypes } from '@poi/actions/poi.actions';

export interface State {
  error: HttpErrorResponse;
  pending: boolean;
}

export const initialState: State = {
  error: null,
  pending: false,
};

export function reducer(state = initialState, action: PoiActions): State {
  switch (action.type) {
    case PoiActionTypes.UPDATE:
    case PoiActionTypes.DELETE:
      return { ...state, error: null, pending: true };

    case PoiActionTypes.UPDATE_SUCCESS:
    case PoiActionTypes.DELETE_SUCCESS:
      return { ...state, error: null, pending: false };

    case PoiActionTypes.UPDATE_FAILURE:
    case PoiActionTypes.DELETE_FAILURE:
      return { ...state, error: action.payload, pending: false };

    default:
      return state;
  }
}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
