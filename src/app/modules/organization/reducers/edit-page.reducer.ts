import { HttpErrorResponse } from '@angular/common/http';

import { OrganizationActions, OrganizationActionTypes } from '@organization/actions/organization.actions';

export interface State {
  error: HttpErrorResponse | null;
  pending: boolean;
}

export const initialState: State = {
  error: null,
  pending: false,
};

export function reducer(state = initialState, action: OrganizationActions): State {
  switch (action.type) {
    case OrganizationActionTypes.UPDATE:
    case OrganizationActionTypes.DELETE:
      return { ...state, error: null, pending: true };

    case OrganizationActionTypes.UPDATE_SUCCESS:
    case OrganizationActionTypes.DELETE_SUCCESS:
      return { ...state, error: null, pending: false };

    case OrganizationActionTypes.UPDATE_FAILURE:
    case OrganizationActionTypes.DELETE_FAILURE:
      return { ...state, error: action.payload, pending: false };

    default:
      return state;
  }
}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
