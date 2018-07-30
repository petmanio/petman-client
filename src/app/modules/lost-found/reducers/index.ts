import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import * as fromLostFound from '@lost-found/reducers/lost-found.reducer';
import * as fromLostFoundListPage from '@lost-found/reducers/lost-found-list-page.reducer';
import * as fromLostFoundCreatePage from '@lost-found/reducers/lost-found-create-page.reducer';
import * as fromLostFoundUpdatePage from '@lost-found/reducers/lost-found-update-page.reducer';

export interface State {
  lostFound: fromLostFound.State;
  lostFoundCreatePage: fromLostFoundCreatePage.State;
  lostFoundListPage: fromLostFoundListPage.State;
  lostFoundUpdatePage: fromLostFoundUpdatePage.State;
}

export const reducers: ActionReducerMap<State> = {
  lostFound: fromLostFound.reducer,
  lostFoundCreatePage: fromLostFoundCreatePage.reducer,
  lostFoundListPage: fromLostFoundListPage.reducer,
  lostFoundUpdatePage: fromLostFoundUpdatePage.reducer
};

export const getLostFoundState = createFeatureSelector<State>('lost-found');

/**
 * Entities
 */
export const getEntitiesState = createSelector(
  getLostFoundState,
  state => state.lostFound
);
export const getSelectedId = createSelector(
  getEntitiesState,
  fromLostFound.getSelectedId
);
export const getTotal = createSelector(
  getEntitiesState,
  fromLostFound.getTotal
);
export const getIsListLoaded = createSelector(
  getEntitiesState,
  fromLostFound.getIsListLoaded
);
export const {
  selectIds: getIds,
  selectEntities: getEntities,
  selectAll: getAll,
  selectTotal: getTotalInStore
} = fromLostFound.adapter.getSelectors(getEntitiesState);
export const getSelected = createSelector(
  getEntities,
  getSelectedId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

/**
 * LostFound create page
 */
export const getLostFoundCreatePageState = createSelector(
  getLostFoundState,
  (state: State) => state.lostFoundCreatePage
);
export const getLostFoundCreatePageError = createSelector(
  getLostFoundCreatePageState,
  fromLostFoundCreatePage.getError
);
export const getLostFoundCreatePagePending = createSelector(
  getLostFoundCreatePageState,
  fromLostFoundCreatePage.getPending
);

/**
 * LostFound update page
 */
export const getLostFoundUpdatePageState = createSelector(
  getLostFoundState,
  (state: State) => state.lostFoundUpdatePage
);
export const getLostFoundUpdatePageError = createSelector(
  getLostFoundUpdatePageState,
  fromLostFoundUpdatePage.getError
);
export const getLostFoundUpdatePagePending = createSelector(
  getLostFoundUpdatePageState,
  fromLostFoundUpdatePage.getPending
);

/**
 * LostFound list Page
 */
export const getLostFoundListPageState = createSelector(
  getLostFoundState,
  (state: State) => state.lostFoundListPage
);
export const getLostFoundListPageError = createSelector(
  getLostFoundListPageState,
  fromLostFoundListPage.getError
);
export const getLostFoundListPagePending = createSelector(
  getLostFoundListPageState,
  fromLostFoundListPage.getPending
);
