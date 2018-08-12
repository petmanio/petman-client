import { HttpErrorResponse } from '@angular/common/http';

import { SharedActionTypes, SharedActions } from '@shared/actions/shared.actions';
import { LostFoundActions, LostFoundActionTypes } from '@lost-found/actions/lost-found.actions';

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

export function reducer(state = initialState, action: LostFoundActions | SharedActions): State {
  switch (action.type) {
    case LostFoundActionTypes.LIST:
      return { ...state, showLoader: true, error: null, pending: true };

    case LostFoundActionTypes.MORE:
      return { ...state, error: null, pending: true };

    case LostFoundActionTypes.LIST_SUCCESS:
    case LostFoundActionTypes.MORE_SUCCESS:
      return { ...state, showLoader: false, error: null, pending: false };

    case LostFoundActionTypes.LIST_FAILURE:
    case LostFoundActionTypes.MORE_FAILURE:
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
