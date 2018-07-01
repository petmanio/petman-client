import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { OrganizationDto } from '@petman/common';

import { OrganizationActions, OrganizationActionTypes } from '@organization/actions/organization.actions';

export interface State extends EntityState<OrganizationDto> {
  selectedId: number | null;
  total: number;
  isListLoaded: boolean;
}

export const adapter: EntityAdapter<OrganizationDto> = createEntityAdapter<OrganizationDto>({
  selectId: (s: OrganizationDto) => s.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  selectedId: null,
  total: null,
  isListLoaded: false
});

export function reducer(state = initialState, action: OrganizationActions): State {
  switch (action.type) {
    case OrganizationActionTypes.CREATE_SUCCESS:
      return { ...state, ...adapter.addOne(action.payload, state), total: state.total + 1 };

    case OrganizationActionTypes.UPDATE_SUCCESS:
      return { ...state, ...adapter.updateOne({ id: action.payload.id, changes: action.payload }, state) };

    case OrganizationActionTypes.DELETE_SUCCESS:
      return { ...state, ...adapter.removeOne(action.payload, state), total: state.total + 1 };

    case OrganizationActionTypes.LOAD_SUCCESS:
      return { ...state, ...adapter.addOne(action.payload, state) };

    case OrganizationActionTypes.LIST_SUCCESS:
      return { ...state, ...adapter.addAll(action.payload.list, state), total: action.payload.total, isListLoaded: true };

    case OrganizationActionTypes.MORE_SUCCESS:
      return { ...state, ...adapter.addMany(action.payload.list, state), total: action.payload.total };

    case OrganizationActionTypes.SELECT:
      return { ...state, selectedId: action.payload };

    default:
      return state;
  }
}

export const getSelectedId = (state: State) => state.selectedId;
export const getTotal = (state: State) => state.total;
export const getIsListLoaded = (state: State) => state.isListLoaded;
