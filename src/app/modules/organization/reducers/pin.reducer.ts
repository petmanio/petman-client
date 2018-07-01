import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { PinDto } from '@petman/common';

import { OrganizationActions, OrganizationActionTypes } from '@organization/actions/organization.actions';

export interface State extends EntityState<PinDto> {
  selectedId: number | null;
  total: number;
}

export const adapter: EntityAdapter<PinDto> = createEntityAdapter<PinDto>({
  selectId: (s: PinDto) => s.title,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  selectedId: null,
  total: null,
});

export function reducer(state = initialState, action: OrganizationActions): State {
  switch (action.type) {
    case OrganizationActionTypes.PINS_SUCCESS:
      return { ...state, ...adapter.addAll(action.payload, state), total: action.payload.length };

    default:
      return state;
  }
}

export const getSelectedId = (state: State) => state.selectedId;
export const getTotal = (state: State) => state.total;
