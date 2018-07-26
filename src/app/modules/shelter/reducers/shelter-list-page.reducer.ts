import { HttpErrorResponse } from '@angular/common/http';

import {
  SharedActionTypes,
  SharedActions
} from '@shared/actions/shared.actions';
import {
  ShelterActions,
  ShelterActionTypes
} from '@shelter/actions/shelter.actions';

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
  action: ShelterActions | SharedActions
): State {
  switch (action.type) {
    case ShelterActionTypes.LIST:
    case ShelterActionTypes.MORE:
      return { ...state, error: null, pending: true };

    case ShelterActionTypes.LIST_SUCCESS:
    case ShelterActionTypes.MORE_SUCCESS:
      return { ...state, error: null, pending: false };

    case ShelterActionTypes.LIST_FAILURE:
    case ShelterActionTypes.MORE_FAILURE:
      return { ...state, error: action.payload, pending: false };

    case SharedActionTypes.CLEAN_ERROR:
      return initialState;

    default:
      return state;
  }
}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
