import { HttpErrorResponse } from '@angular/common/http';

import { OrganizationActions, OrganizationActionTypes } from '@organization/actions/organization.actions';
import { MapActions, MapActionTypes } from '@map/actions/map.actions';

export interface State {
  error: HttpErrorResponse | null;
  pending: boolean;
}

export const initialState: State = {
  error: null,
  pending: false,
};

export function reducer(state = initialState, action: MapActions | OrganizationActions): State {
  switch (action.type) {
    case OrganizationActionTypes.LIST:
    case OrganizationActionTypes.MORE:
    case OrganizationActionTypes.PINS:
      return { ...state, error: null, pending: true };

    case OrganizationActionTypes.LIST_SUCCESS:
    case OrganizationActionTypes.MORE_SUCCESS:
    case OrganizationActionTypes.PINS_SUCCESS:
      return { ...state, error: null, pending: false };

    case OrganizationActionTypes.LIST_FAILURE:
    case OrganizationActionTypes.MORE_FAILURE:
    case OrganizationActionTypes.PINS_FAILURE:
      return { ...state, error: action.payload, pending: false };

    default:
      return state;
  }
}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
