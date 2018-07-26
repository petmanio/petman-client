import { HttpErrorResponse } from '@angular/common/http';

import {
  SharedActionTypes,
  SharedActions
} from '@shared/actions/shared.actions';
import { PoiActions, PoiActionTypes } from '@poi/actions/poi.actions';

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
  action: PoiActions | SharedActions
): State {
  switch (action.type) {
    case PoiActionTypes.LIST:
    case PoiActionTypes.MORE:
      return { ...state, error: null, pending: true };

    case PoiActionTypes.LIST_SUCCESS:
    case PoiActionTypes.MORE_SUCCESS:
      return { ...state, error: null, pending: false };

    case PoiActionTypes.LIST_FAILURE:
    case PoiActionTypes.MORE_FAILURE:
      return { ...state, error: action.payload, pending: false };

    case SharedActionTypes.CLEAN_ERROR:
      return initialState;

    default:
      return state;
  }
}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
