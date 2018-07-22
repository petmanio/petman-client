import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromShelter from '@shelter/reducers/shelter.reducer';
import * as fromShelterListPage from '@shelter/reducers/shelter-list-page.reducer';
import * as fromShelterCreatePage from '@shelter/reducers/shelter-create-page.reducer';
import * as fromShelterUpdatePage from '@shelter/reducers/shelter-update-page.reducer';

export interface State {
  shelter: fromShelter.State;
  shelterCreatePage: fromShelterCreatePage.State;
  shelterListPage: fromShelterListPage.State;
  shelterUpdatePage: fromShelterUpdatePage.State;
}

export const reducers: ActionReducerMap<State> = {
  shelter: fromShelter.reducer,
  shelterCreatePage: fromShelterCreatePage.reducer,
  shelterListPage: fromShelterListPage.reducer,
  shelterUpdatePage: fromShelterUpdatePage.reducer
};

export const getShelterState = createFeatureSelector<State>('shelter');

/**
 * Entities
 */
export const getEntitiesState = createSelector(getShelterState, state => state.shelter);
export const getSelectedId = createSelector(getEntitiesState, fromShelter.getSelectedId);
export const getTotal = createSelector(getEntitiesState, fromShelter.getTotal);
export const getIsListLoaded = createSelector(getEntitiesState, fromShelter.getIsListLoaded);
export const {
  selectIds: getIds,
  selectEntities: getEntities,
  selectAll: getAll,
  selectTotal: getTotalInStore,
} = fromShelter.adapter.getSelectors(getEntitiesState);
export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

/**
 * Shelter add Page
 */
export const getShelterCreatePageState = createSelector(getShelterState, (state: State) => state.shelterCreatePage);
export const getShelterCreatePageError = createSelector(getShelterCreatePageState, fromShelterCreatePage.getError);
export const getShelterCreatePagePending = createSelector(getShelterCreatePageState, fromShelterCreatePage.getPending);

/**
 * Shelter edit Page
 */
export const getShelterUpdatePageState = createSelector(getShelterState, (state: State) => state.shelterUpdatePage);
export const getShelterUpdatePageError = createSelector(getShelterUpdatePageState, fromShelterUpdatePage.getError);
export const getShelterUpdatePagePending = createSelector(getShelterUpdatePageState, fromShelterUpdatePage.getPending);

/**
 * Shelter list Page
 */
export const getShelterListPageState = createSelector(getShelterState, (state: State) => state.shelterListPage);
export const getShelterListPageError = createSelector(getShelterListPageState, fromShelterListPage.getError);
export const getShelterListPagePending = createSelector(getShelterListPageState, fromShelterListPage.getPending);
