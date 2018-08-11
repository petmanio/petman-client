import { HttpErrorResponse } from '@angular/common/http';

import { SharedActionTypes, SharedActions } from '@shared/actions/shared.actions';
import { LostFoundActions, LostFoundActionTypes } from '@lost-found/actions/lost-found.actions';

export interface State {
  error: HttpErrorResponse;
  pending: boolean;
  isListLoaded: boolean;
}

export const initialState: State = {
  error: null,
  pending: false,
  isListLoaded: false
};

export function reducer(state = initialState, action: LostFoundActions | SharedActions): State {
  switch (action.type) {
    case LostFoundActionTypes.LIST:
    case LostFoundActionTypes.MORE:
      return { ...state, error: null, pending: true };

    case LostFoundActionTypes.LIST_SUCCESS:
    case LostFoundActionTypes.MORE_SUCCESS:
      return { ...state, isListLoaded: true, error: null, pending: false };

    case LostFoundActionTypes.LIST_FAILURE:
    case LostFoundActionTypes.MORE_FAILURE:
      return { ...state, isListLoaded: true, error: action.payload, pending: false };

    case SharedActionTypes.CLEAN_ERROR:
      return initialState;

    default:
      return state;
  }
}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
export const getIsListLoaded = (state: State) => state.isListLoaded;
