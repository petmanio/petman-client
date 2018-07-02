import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromListPage from '@map/reducers/list-page.reducer';

export interface State {
  listPage: fromListPage.State;
}

export const reducers: ActionReducerMap<State> = {
  listPage: fromListPage.reducer
};

export const getMapState = createFeatureSelector<State>('map');

/**
 * List Page
 */
export const getListPageState = createSelector(getMapState, (state: State) => state.listPage);
export const getListPageError = createSelector(getListPageState, fromListPage.getError);
export const getListPagePending = createSelector(getListPageState, fromListPage.getPending);
