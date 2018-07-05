import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { PoiDto } from '@petman/common';

import { PoiActions, PoiActionTypes } from '@poi/actions/poi.actions';

export interface State extends EntityState<PoiDto> {
  selectedId: number;
  total: number;
  isListLoaded: boolean;
}

export const adapter: EntityAdapter<PoiDto> = createEntityAdapter<PoiDto>({
  selectId: (s: PoiDto) => s.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  selectedId: null,
  total: null,
  isListLoaded: false
});

export function reducer(state = initialState, action: PoiActions): State {
  switch (action.type) {
    case PoiActionTypes.CREATE_SUCCESS:
      return { ...state, ...adapter.addOne(action.payload, state), total: state.total + 1 };

    case PoiActionTypes.UPDATE_SUCCESS:
      return { ...state, ...adapter.updateOne({ id: action.payload.id, changes: action.payload }, state) };

    case PoiActionTypes.DELETE_SUCCESS:
      return { ...state, ...adapter.removeOne(action.payload, state), total: state.total + 1 };

    case PoiActionTypes.LOAD_SUCCESS:
      return { ...state, ...adapter.addOne(action.payload, state) };

    case PoiActionTypes.LIST_SUCCESS:
      return { ...state, ...adapter.addAll(action.payload.list, state), total: action.payload.total, isListLoaded: true };

    case PoiActionTypes.MORE_SUCCESS:
      return { ...state, ...adapter.addMany(action.payload.list, state), total: action.payload.total };

    case PoiActionTypes.SELECT:
      return { ...state, selectedId: action.payload };

    default:
      return state;
  }
}

export const getSelectedId = (state: State) => state.selectedId;
export const getTotal = (state: State) => state.total;
export const getIsListLoaded = (state: State) => state.isListLoaded;
