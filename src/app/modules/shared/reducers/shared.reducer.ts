import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ServiceDto } from '@petman/common';

import { SharedActions, SharedActionTypes } from '../actions/shared.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State extends EntityState<ServiceDto> {
  serviceSelectedId: number | null;
  serviceTotal: number;
}

export const adapter: EntityAdapter<ServiceDto> = createEntityAdapter<ServiceDto>({
  selectId: (s: ServiceDto) => s.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  serviceSelectedId: null,
  serviceTotal: null
});

export function reducer(state = initialState, action: SharedActions): State {
  switch (action.type) {

    case SharedActionTypes.SERVICE_LIST_SUCCESS:
      return { ...state, ...adapter.addAll(action.payload.list, state), serviceTotal: action.payload.total };

    default:
      return state;

  }
}

export const selectState = createFeatureSelector<State>('shared');
export const getServiceSelectedId = createSelector(selectState, state => state.serviceSelectedId);
export const getServiceTotal = createSelector(selectState, state => state.serviceTotal);
export const {
  selectEntities: getServiceEntities,
  selectAll: getServiceAll,
  selectTotal: getServiceTotalInStore
} = adapter.getSelectors(selectState);
