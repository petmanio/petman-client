import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromSitter from '@sitter/reducers/sitter.reducer';
import * as fromSitterListPage from '@sitter/reducers/sitter-list-page.reducer';
import * as fromSitterCreatePage from '@sitter/reducers/sitter-create-page.reducer';
import * as fromSitterUpdatePage from '@sitter/reducers/sitter-update-page.reducer';

export interface State {
  sitter: fromSitter.State;
  sitterCreatePage: fromSitterCreatePage.State;
  sitterListPage: fromSitterListPage.State;
  sitterUpdatePage: fromSitterUpdatePage.State;
}

export const reducers: ActionReducerMap<State> = {
  sitter: fromSitter.reducer,
  sitterCreatePage: fromSitterCreatePage.reducer,
  sitterListPage: fromSitterListPage.reducer,
  sitterUpdatePage: fromSitterUpdatePage.reducer
};

export const getSitterState = createFeatureSelector<State>('sitter');

/**
 * Entities
 */
export const getEntitiesState = createSelector(getSitterState, state => state.sitter);
export const getSelectedId = createSelector(getEntitiesState, fromSitter.getSelectedId);
export const getTotal = createSelector(getEntitiesState, fromSitter.getTotal);
export const getIsListLoaded = createSelector(getEntitiesState, fromSitter.getIsListLoaded);
export const {
  selectIds: getIds,
  selectEntities: getEntities,
  selectAll: getAll,
  selectTotal: getTotalInStore,
} = fromSitter.adapter.getSelectors(getEntitiesState);
export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

/**
 * Sitter add Page
 */
export const getSitterCreatePageState = createSelector(getSitterState, (state: State) => state.sitterCreatePage);
export const getSitterCreatePageError = createSelector(getSitterCreatePageState, fromSitterCreatePage.getError);
export const getSitterCreatePagePending = createSelector(getSitterCreatePageState, fromSitterCreatePage.getPending);

/**
 * Sitter edit Page
 */
export const getSitterUpdatePageState = createSelector(getSitterState, (state: State) => state.sitterUpdatePage);
export const getSitterUpdatePageError = createSelector(getSitterUpdatePageState, fromSitterUpdatePage.getError);
export const getSitterUpdatePagePending = createSelector(getSitterUpdatePageState, fromSitterUpdatePage.getPending);

/**
 * Sitter list Page
 */
export const getSitterListPageState = createSelector(getSitterState, (state: State) => state.sitterListPage);
export const getSitterListPageError = createSelector(getSitterListPageState, fromSitterListPage.getError);
export const getSitterListPagePending = createSelector(getSitterListPageState, fromSitterListPage.getPending);
