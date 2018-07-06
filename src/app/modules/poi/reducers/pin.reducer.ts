import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { PinDto } from '@petman/common';

import { PoiActions, PoiActionTypes } from '@poi/actions/poi.actions';

export interface State extends EntityState<PinDto> {
  selectedId: number;
  total: number;
}

export const adapter: EntityAdapter<PinDto> = createEntityAdapter<PinDto>({
  selectId: (s: PinDto) => s.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  selectedId: null,
  total: null,
});

export function reducer(state = initialState, action: PoiActions): State {
  switch (action.type) {
    case PoiActionTypes.PINS_SUCCESS:
      return { ...state, ...adapter.addAll(action.payload, state), total: action.payload.length };

    default:
      return state;
  }
}

export const getSelectedId = (state: State) => state.selectedId;
export const getTotal = (state: State) => state.total;
