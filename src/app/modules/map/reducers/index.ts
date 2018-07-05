import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromMapPage from '@map/reducers/map-page.reducer';

export interface State {
  mapPage: fromMapPage.State;
}

export const reducers: ActionReducerMap<State> = {
  mapPage: fromMapPage.reducer
};

export const getMapState = createFeatureSelector<State>('map');

/**
 * List Page
 */
export const getMapPageState = createSelector(getMapState, (state: State) => state.mapPage);
export const getMapPageError = createSelector(getMapPageState, fromMapPage.getError);
export const getMapPagePending = createSelector(getMapPageState, fromMapPage.getPending);
