import { HttpErrorResponse } from '@angular/common/http';

import { ShelterActions, ShelterActionTypes } from '@shelter/actions/shelter.actions';

export interface State {
  error: HttpErrorResponse | null;
  pending: boolean;
}

export const initialState: State = {
  error: null,
  pending: false,
};

export function reducer(state = initialState, action: ShelterActions): State {
  switch (action.type) {
    case ShelterActionTypes.CREATE:
      return { ...state, error: null, pending: true };

    case ShelterActionTypes.CREATE_SUCCESS:
      return { ...state, error: null, pending: false };

    case ShelterActionTypes.CREATE_FAILURE:
      return { ...state, error: action.payload, pending: false };

    default:
      return state;
  }
}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
