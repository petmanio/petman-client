import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromShared from '@shared/reducers/shared.reducer';

export interface State {
  shared: fromShared.State;
}

export const reducers: ActionReducerMap<State> = {
  shared: fromShared.reducer,
};

export const getSharedState = createFeatureSelector<State>('shared');

/**
 * Entities
 */
export const getServiceEntitiesState = createSelector(getSharedState, state => state.shared);
export const getServiceSelectedId = createSelector(getServiceEntitiesState, fromShared.getServiceSelectedId);
export const getServiceTotal = createSelector(getServiceEntitiesState, fromShared.getServiceTotal);
export const {
  selectIds: getServiceIds,
  selectEntities: getServiceEntities,
  selectAll: getServiceAll,
  selectTotal: getServiceTotalInStore,
} = fromShared.adapter.getSelectors(getServiceEntitiesState);
export const getServiceSelected = createSelector(getServiceEntities, getServiceSelectedId, (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);
