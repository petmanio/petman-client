import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromAdopt from '@adopt/reducers/adopt.reducer';
import * as fromAdoptListPage from '@adopt/reducers/adopt-list-page.reducer';
import * as fromAdoptCreatePage from '@adopt/reducers/adopt-create-page.reducer';
import * as fromAdoptUpdatePage from '@adopt/reducers/adopt-update-page.reducer';

export interface State {
  adopt: fromAdopt.State;
  adoptCreatePage: fromAdoptCreatePage.State;
  adoptListPage: fromAdoptListPage.State;
  adoptUpdatePage: fromAdoptUpdatePage.State;
}

export const reducers: ActionReducerMap<State> = {
  adopt: fromAdopt.reducer,
  adoptCreatePage: fromAdoptCreatePage.reducer,
  adoptListPage: fromAdoptListPage.reducer,
  adoptUpdatePage: fromAdoptUpdatePage.reducer
};

export const getAdoptState = createFeatureSelector<State>('adopt');

/**
 * Entities
 */
export const getEntitiesState = createSelector(getAdoptState, state => state.adopt);
export const getSelectedId = createSelector(getEntitiesState, fromAdopt.getSelectedId);
export const getTotal = createSelector(getEntitiesState, fromAdopt.getTotal);
export const getIsListLoaded = createSelector(getEntitiesState, fromAdopt.getIsListLoaded);
export const {
  selectIds: getIds,
  selectEntities: getEntities,
  selectAll: getAll,
  selectTotal: getTotalInStore,
} = fromAdopt.adapter.getSelectors(getEntitiesState);
export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

/**
 * Adopt add Page
 */
export const getAdoptCreatePageState = createSelector(getAdoptState, (state: State) => state.adoptCreatePage);
export const getAdoptCreatePageError = createSelector(getAdoptCreatePageState, fromAdoptCreatePage.getError);
export const getAdoptCreatePagePending = createSelector(getAdoptCreatePageState, fromAdoptCreatePage.getPending);

/**
 * Adopt edit Page
 */
export const getAdoptUpdatePageState = createSelector(getAdoptState, (state: State) => state.adoptUpdatePage);
export const getAdoptUpdatePageError = createSelector(getAdoptUpdatePageState, fromAdoptUpdatePage.getError);
export const getAdoptUpdatePagePending = createSelector(getAdoptUpdatePageState, fromAdoptUpdatePage.getPending);

/**
 * Adopt list Page
 */
export const getAdoptListPageState = createSelector(getAdoptState, (state: State) => state.adoptListPage);
export const getAdoptListPageError = createSelector(getAdoptListPageState, fromAdoptListPage.getError);
export const getAdoptListPagePending = createSelector(getAdoptListPageState, fromAdoptListPage.getPending);
