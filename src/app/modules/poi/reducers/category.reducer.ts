import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { CategoryDto } from '@petman/common';

import { PoiActions, PoiActionTypes } from '@poi/actions/poi.actions';

export interface State extends EntityState<CategoryDto> {
  selectedId: number;
  total: number;
}

export const adapter: EntityAdapter<CategoryDto> = createEntityAdapter<CategoryDto>({
  selectId: (s: CategoryDto) => s.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  selectedId: null,
  total: null,
});

export function reducer(state = initialState, action: PoiActions): State {
  switch (action.type) {
    case PoiActionTypes.CATEGORIES_SUCCESS:
      return { ...state, ...adapter.addAll(action.payload.list, state), total: action.payload.total };

    default:
      return state;
  }
}

export const getSelectedId = (state: State) => state.selectedId;
export const getTotal = (state: State) => state.total;
