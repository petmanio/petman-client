import { HttpErrorResponse } from '@angular/common/http';

import { ShelterActions, ShelterActionTypes } from '@shelter/actions/shelter.actions';

export interface State {
  error: HttpErrorResponse;
  pending: boolean;
}

export const initialState: State = {
  error: null,
  pending: false,
};

export function reducer(state = initialState, action: ShelterActions): State {
  switch (action.type) {
    case ShelterActionTypes.UPDATE:
    case ShelterActionTypes.DELETE:
      return { ...state, error: null, pending: true };

    case ShelterActionTypes.UPDATE_SUCCESS:
    case ShelterActionTypes.DELETE_SUCCESS:
      return { ...state, error: null, pending: false };

    case ShelterActionTypes.UPDATE_FAILURE:
    case ShelterActionTypes.DELETE_FAILURE:
      return { ...state, error: action.payload, pending: false };

    default:
      return state;
  }
}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
