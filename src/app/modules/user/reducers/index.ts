import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import * as fromUser from '@user/reducers/user.reducer';
import * as fromUserDetailsPage from '@user/reducers/user-details-page.reducer';
import * as fromUserUpdatePage from '@user/reducers/user-update-page.reducer';

export interface State {
  user: fromUser.State;
  userDetailsPage: fromUserDetailsPage.State;
  userUpdatePage: fromUserUpdatePage.State;
}

export const reducers: ActionReducerMap<State> = {
  user: fromUser.reducer,
  userDetailsPage: fromUserDetailsPage.reducer,
  userUpdatePage: fromUserUpdatePage.reducer
};

export const selectUserState = createFeatureSelector<State>('user');

/**
 * Entities
 */
export const getUserState = createSelector(
  selectUserState,
  state => state.user
);
export const getSelectedId = createSelector(
  getUserState,
  fromUser.getSelectedId
);
export const getUserEntitiesState = createSelector(
  getUserState,
  state => state.userEntities
);
export const getApplicationEntitiesState = createSelector(
  getUserState,
  state => state.applicationEntities
);
export const {
  selectEntities: getUserEntities
} = fromUser.userAdapter.getSelectors(getUserEntitiesState);
export const getSelectedUser = createSelector(
  getUserEntities,
  getSelectedId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);
export const {
  selectEntities: getApplicationEntities
} = fromUser.applicationAdapter.getSelectors(getApplicationEntitiesState);
export const getSelectedUserApplications = createSelector(
  getApplicationEntities,
  getSelectedId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId] && entities[selectedId].list;
  }
);

export const getGeolocation = createSelector(
  getUserState,
  fromUser.getGeolocation
);
export const getGeolocationCountry = createSelector(
  getUserState,
  fromUser.getGeolocationCountry
);

/**
 * User details page
 */
export const getUserDetailsPageState = createSelector(
  selectUserState,
  (state: State) => state.userDetailsPage
);
export const getUserDetailsPageError = createSelector(
  getUserDetailsPageState,
  fromUserDetailsPage.getError
);
export const getUserDetailsPagePending = createSelector(
  getUserDetailsPageState,
  fromUserDetailsPage.getPending
);

/**
 * User update page
 */
export const getUserUpdatePageState = createSelector(
  selectUserState,
  (state: State) => state.userUpdatePage
);
export const getUserUpdatePageError = createSelector(
  getUserUpdatePageState,
  fromUserUpdatePage.getError
);
export const getUserUpdatePagePending = createSelector(
  getUserUpdatePageState,
  fromUserUpdatePage.getPending
);
