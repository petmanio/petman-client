import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromOrganization from '@organization/reducers/organization.reducer';
import * as fromPin from '@organization/reducers/pin.reducer';
import * as fromListPage from '@organization/reducers/list-page.reducer';
import * as fromAddPage from '@organization/reducers/add-page.reducer';
import * as fromEditPage from '@organization/reducers/edit-page.reducer';

export interface State {
  organization: fromOrganization.State;
  pin: fromPin.State;
  addPage: fromAddPage.State;
  listPage: fromListPage.State;
  editPage: fromEditPage.State;
}

export const reducers: ActionReducerMap<State> = {
  organization: fromOrganization.reducer,
  pin: fromPin.reducer,
  addPage: fromAddPage.reducer,
  editPage: fromEditPage.reducer,
  listPage: fromListPage.reducer
};

export const getOrganizationState = createFeatureSelector<State>('organization');

/**
 * Entities
 */
export const getEntitiesState = createSelector(getOrganizationState, state => state.organization);
export const getSelectedId = createSelector(getEntitiesState, fromOrganization.getSelectedId);
export const getTotal = createSelector(getEntitiesState, fromOrganization.getTotal);
export const getIsListLoaded = createSelector(getEntitiesState, fromOrganization.getIsListLoaded);
export const {
  selectIds: getIds,
  selectEntities: getEntities,
  selectAll: getAll,
  selectTotal: getTotalInStore,
} = fromOrganization.adapter.getSelectors(getEntitiesState);
export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

/**
 * Pin entities
 */
export const getPinEntitiesState = createSelector(getOrganizationState, state => state.pin);
export const getPinSelectedId = createSelector(getPinEntitiesState, fromPin.getSelectedId);
export const getPinTotal = createSelector(getPinEntitiesState, fromPin.getTotal);
export const {
  selectIds: getPinIds,
  selectEntities: getPinEntities,
  selectAll: getPinAll,
  selectTotal: getPinTotalInStore,
} = fromPin.adapter.getSelectors(getPinEntitiesState);
export const getPinSelected = createSelector(getPinEntities, getPinSelectedId, (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

/**
 * Add Page
 */
export const getAddPageState = createSelector(getOrganizationState, (state: State) => state.addPage);
export const getAddPageError = createSelector(getAddPageState, fromAddPage.getError);
export const getAddPagePending = createSelector(getAddPageState, fromAddPage.getPending);

/**
 * Edit Page
 */
export const getEditPageState = createSelector(getOrganizationState, (state: State) => state.editPage);
export const getEditPageError = createSelector(getEditPageState, fromEditPage.getError);
export const getEditPagePending = createSelector(getEditPageState, fromEditPage.getPending);

/**
 * List Page
 */
export const getListPageState = createSelector(getOrganizationState, (state: State) => state.listPage);
export const getListPageError = createSelector(getListPageState, fromListPage.getError);
export const getListPagePending = createSelector(getListPageState, fromListPage.getPending);
