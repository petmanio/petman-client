import { UserGeoDto } from '@petman/common';
import { UserActionTypes, UserActions } from '@user/actions/user.actions';
import { createSelector } from '@ngrx/store';

export interface State {
  geolocation: UserGeoDto;
}

export const initialState: State = {
  geolocation: null
};

export function reducer(state = initialState, action: UserActions): State {
  switch (action.type) {
    case UserActionTypes.GEOLOCATION_SUCCESS:
      return { ...state, geolocation: action.payload };

    default:
      return state;
  }
}

export const getGeolocation = (state: State) => state.geolocation;
export const getGeolocationCountry = createSelector(
  getGeolocation,
  geolocation => {
    return geolocation ? geolocation.country : null;
  }
);
