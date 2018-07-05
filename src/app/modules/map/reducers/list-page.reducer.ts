import { HttpErrorResponse } from '@angular/common/http';

import { PoiActions, PoiActionTypes } from '@poi/actions/poi.actions';
import { MapActions } from '@map/actions/map.actions';

export interface State {
  error: HttpErrorResponse;
  pending: boolean;
}

export const initialState: State = {
  error: null,
  pending: false,
};

export function reducer(state = initialState, action: MapActions | PoiActions): State {
  switch (action.type) {
    case PoiActionTypes.LIST:
    case PoiActionTypes.MORE:
    case PoiActionTypes.PINS:
      return { ...state, error: null, pending: true };

    case PoiActionTypes.LIST_SUCCESS:
    case PoiActionTypes.MORE_SUCCESS:
    case PoiActionTypes.PINS_SUCCESS:
      return { ...state, error: null, pending: false };

    case PoiActionTypes.LIST_FAILURE:
    case PoiActionTypes.MORE_FAILURE:
    case PoiActionTypes.PINS_FAILURE:
      return { ...state, error: action.payload, pending: false };

    default:
      return state;
  }
}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
