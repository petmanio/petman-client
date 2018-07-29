import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import * as fromUser from '@user/reducers/user.reducer';

export interface State {
  user: fromUser.State;
}

export const reducers: ActionReducerMap<State> = {
  user: fromUser.reducer
};

export const selectUserState = createFeatureSelector<State>('user');

export const getUserState = createSelector(
  selectUserState,
  (state: State) => state.user
);
export const getGeolocation = createSelector(
  getUserState,
  fromUser.getGeolocation
);
export const getGeolocationCountry = createSelector(
  getUserState,
  fromUser.getGeolocationCountry
);
