import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromShelter from '@shelter/reducers/shelter.reducer';
import * as fromShelterListPage from '@shelter/reducers/shelter-list-page.reducer';
import * as fromShelterAddPage from '@shelter/reducers/shelter-add-page.reducer';
import * as fromShelterEditPage from '@shelter/reducers/shelter-edit-page.reducer';

export interface State {
  shelter: fromShelter.State;
  shelterAddPage: fromShelterAddPage.State;
  shelterListPage: fromShelterListPage.State;
  shelterEditPage: fromShelterEditPage.State;
}

export const reducers: ActionReducerMap<State> = {
  shelter: fromShelter.reducer,
  shelterAddPage: fromShelterAddPage.reducer,
  shelterListPage: fromShelterListPage.reducer,
  shelterEditPage: fromShelterEditPage.reducer
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
export const getShelterAddPageState = createSelector(getShelterState, (state: State) => state.shelterAddPage);
export const getShelterAddPageError = createSelector(getShelterAddPageState, fromShelterAddPage.getError);
export const getShelterAddPagePending = createSelector(getShelterAddPageState, fromShelterAddPage.getPending);

/**
 * Shelter edit Page
 */
export const getShelterEditPageState = createSelector(getShelterState, (state: State) => state.shelterEditPage);
export const getShelterEditPageError = createSelector(getShelterEditPageState, fromShelterEditPage.getError);
export const getShelterEditPagePending = createSelector(getShelterEditPageState, fromShelterEditPage.getPending);

/**
 * Shelter list Page
 */
export const getShelterListPageState = createSelector(getShelterState, (state: State) => state.shelterListPage);
export const getShelterListPageError = createSelector(getShelterListPageState, fromShelterListPage.getError);
export const getShelterListPagePending = createSelector(getShelterListPageState, fromShelterListPage.getPending);
