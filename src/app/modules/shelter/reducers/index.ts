import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromShelter from '@shelter/reducers/shelter.reducer';
import * as fromListPage from '@shelter/reducers/list-page.reducer';
import * as fromAddPage from '@shelter/reducers/add-page.reducer';
import * as fromEditPage from '@shelter/reducers/edit-page.reducer';

export interface State {
  shelter: fromShelter.State;
  addPage: fromAddPage.State;
  listPage: fromListPage.State;
  editPage: fromEditPage.State;
}

export const reducers: ActionReducerMap<State> = {
  shelter: fromShelter.reducer,
  addPage: fromAddPage.reducer,
  editPage: fromEditPage.reducer,
  listPage: fromListPage.reducer
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
 * Add Page
 */
export const getAddPageState = createSelector(getShelterState, (state: State) => state.addPage);
export const getAddPageError = createSelector(getAddPageState, fromAddPage.getError);
export const getAddPagePending = createSelector(getAddPageState, fromAddPage.getPending);

/**
 * Edit Page
 */
export const getEditPageState = createSelector(getShelterState, (state: State) => state.editPage);
export const getEditPageError = createSelector(getEditPageState, fromEditPage.getError);
export const getEditPagePending = createSelector(getEditPageState, fromEditPage.getPending);

/**
 * List Page
 */
export const getListPageState = createSelector(getShelterState, (state: State) => state.listPage);
export const getListPageError = createSelector(getListPageState, fromListPage.getError);
export const getListPagePending = createSelector(getListPageState, fromListPage.getPending);
