import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromWalker from '@walker/reducers/walker.reducer';
import * as fromWalkerListPage from '@walker/reducers/walker-list-page.reducer';
import * as fromWalkerCreatePage from '@walker/reducers/walker-create-page.reducer';
import * as fromWalkerUpdatePage from '@walker/reducers/walker-update-page.reducer';

export interface State {
  walker: fromWalker.State;
  walkerCreatePage: fromWalkerCreatePage.State;
  walkerListPage: fromWalkerListPage.State;
  walkerUpdatePage: fromWalkerUpdatePage.State;
}

export const reducers: ActionReducerMap<State> = {
  walker: fromWalker.reducer,
  walkerCreatePage: fromWalkerCreatePage.reducer,
  walkerListPage: fromWalkerListPage.reducer,
  walkerUpdatePage: fromWalkerUpdatePage.reducer
};

export const getWalkerState = createFeatureSelector<State>('walker');

/**
 * Entities
 */
export const getEntitiesState = createSelector(getWalkerState, state => state.walker);
export const getSelectedId = createSelector(getEntitiesState, fromWalker.getSelectedId);
export const getTotal = createSelector(getEntitiesState, fromWalker.getTotal);
export const getIsListLoaded = createSelector(getEntitiesState, fromWalker.getIsListLoaded);
export const {
  selectIds: getIds,
  selectEntities: getEntities,
  selectAll: getAll,
  selectTotal: getTotalInStore,
} = fromWalker.adapter.getSelectors(getEntitiesState);
export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

/**
 * Walker add Page
 */
export const getWalkerCreatePageState = createSelector(getWalkerState, (state: State) => state.walkerCreatePage);
export const getWalkerCreatePageError = createSelector(getWalkerCreatePageState, fromWalkerCreatePage.getError);
export const getWalkerCreatePagePending = createSelector(getWalkerCreatePageState, fromWalkerCreatePage.getPending);

/**
 * Walker edit Page
 */
export const getWalkerUpdatePageState = createSelector(getWalkerState, (state: State) => state.walkerUpdatePage);
export const getWalkerUpdatePageError = createSelector(getWalkerUpdatePageState, fromWalkerUpdatePage.getError);
export const getWalkerUpdatePagePending = createSelector(getWalkerUpdatePageState, fromWalkerUpdatePage.getPending);

/**
 * Walker list Page
 */
export const getWalkerListPageState = createSelector(getWalkerState, (state: State) => state.walkerListPage);
export const getWalkerListPageError = createSelector(getWalkerListPageState, fromWalkerListPage.getError);
export const getWalkerListPagePending = createSelector(getWalkerListPageState, fromWalkerListPage.getPending);
