import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromPoi from '@poi/reducers/poi.reducer';
import * as fromPin from '@poi/reducers/pin.reducer';
import * as fromCategory from '@poi/reducers/category.reducer';
import * as fromPoiListPage from '@poi/reducers/poi-list-page.reducer';
import * as fromPoiAddPage from '@poi/reducers/poi-add-page.reducer';
import * as fromPoiEditPage from '@poi/reducers/poi-edit-page.reducer';

export interface State {
  poi: fromPoi.State;
  pin: fromPin.State;
  category: fromCategory.State;
  poiAddPage: fromPoiAddPage.State;
  poiListPage: fromPoiListPage.State;
  poiEditPage: fromPoiEditPage.State;
}

export const reducers: ActionReducerMap<State> = {
  poi: fromPoi.reducer,
  pin: fromPin.reducer,
  category: fromCategory.reducer,
  poiAddPage: fromPoiAddPage.reducer,
  poiEditPage: fromPoiEditPage.reducer,
  poiListPage: fromPoiListPage.reducer
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
 * Poi add Page
 */
export const getPoiAddPageState = createSelector(getPoiState, (state: State) => state.poiAddPage);
export const getPoiAddPageError = createSelector(getPoiAddPageState, fromPoiAddPage.getError);
export const getPoiAddPagePending = createSelector(getPoiAddPageState, fromPoiAddPage.getPending);

/**
 * Poi edit Page
 */
export const getPoiEditPageState = createSelector(getPoiState, (state: State) => state.poiEditPage);
export const getPoiEditPageError = createSelector(getPoiEditPageState, fromPoiEditPage.getError);
export const getPoiEditPagePending = createSelector(getPoiEditPageState, fromPoiEditPage.getPending);

/**
 * Poi list Page
 */
export const getPoiListPageState = createSelector(getPoiState, (state: State) => state.poiListPage);
export const getPoiListPageError = createSelector(getPoiListPageState, fromPoiListPage.getError);
export const getPoiListPagePending = createSelector(getPoiListPageState, fromPoiListPage.getPending);
