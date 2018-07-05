import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromPoi from '@poi/reducers/poi.reducer';
import * as fromPin from '@poi/reducers/pin.reducer';
import * as fromCategory from '@poi/reducers/category.reducer';
import * as fromListPage from '@poi/reducers/list-page.reducer';
import * as fromAddPage from '@poi/reducers/add-page.reducer';
import * as fromEditPage from '@poi/reducers/edit-page.reducer';

export interface State {
  poi: fromPoi.State;
  pin: fromPin.State;
  category: fromCategory.State;
  addPage: fromAddPage.State;
  listPage: fromListPage.State;
  editPage: fromEditPage.State;
}

export const reducers: ActionReducerMap<State> = {
  poi: fromPoi.reducer,
  pin: fromPin.reducer,
  category: fromCategory.reducer,
  addPage: fromAddPage.reducer,
  editPage: fromEditPage.reducer,
  listPage: fromListPage.reducer
};

export const getPoiState = createFeatureSelector<State>('poi');

/**
 * Entities
 */
export const getEntitiesState = createSelector(getPoiState, state => state.poi);
export const getSelectedId = createSelector(getEntitiesState, fromPoi.getSelectedId);
export const getTotal = createSelector(getEntitiesState, fromPoi.getTotal);
export const getIsListLoaded = createSelector(getEntitiesState, fromPoi.getIsListLoaded);
export const {
  selectIds: getIds,
  selectEntities: getEntities,
  selectAll: getAll,
  selectTotal: getTotalInStore,
} = fromPoi.adapter.getSelectors(getEntitiesState);
export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

/**
 * Pin entities
 */
export const getPinEntitiesState = createSelector(getPoiState, state => state.pin);
export const getPinSelectedId = createSelector(getPinEntitiesState, fromPin.getSelectedId);
export const getPinTotal = createSelector(getPinEntitiesState, fromPin.getTotal);
export const {
  selectEntities: getPinEntities,
  selectAll: getPinAll,
} = fromPin.adapter.getSelectors(getPinEntitiesState);
export const getPinSelected = createSelector(getPinEntities, getPinSelectedId, (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

/**
 * Category entities
 */
export const getCategoryEntitiesState = createSelector(getPoiState, state => state.category);
export const getCategorySelectedId = createSelector(getCategoryEntitiesState, fromCategory.getSelectedId);
export const getCategoryTotal = createSelector(getCategoryEntitiesState, fromCategory.getTotal);
export const {
  selectEntities: getCategoryEntities,
  selectAll: getCategoryAll,
} = fromCategory.adapter.getSelectors(getCategoryEntitiesState);
export const getCategorySelected = createSelector(getCategoryEntities, getCategorySelectedId, (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

/**
 * Add Page
 */
export const getAddPageState = createSelector(getPoiState, (state: State) => state.addPage);
export const getAddPageError = createSelector(getAddPageState, fromAddPage.getError);
export const getAddPagePending = createSelector(getAddPageState, fromAddPage.getPending);

/**
 * Edit Page
 */
export const getEditPageState = createSelector(getPoiState, (state: State) => state.editPage);
export const getEditPageError = createSelector(getEditPageState, fromEditPage.getError);
export const getEditPagePending = createSelector(getEditPageState, fromEditPage.getPending);

/**
 * List Page
 */
export const getListPageState = createSelector(getPoiState, (state: State) => state.listPage);
export const getListPageError = createSelector(getListPageState, fromListPage.getError);
export const getListPagePending = createSelector(getListPageState, fromListPage.getPending);
