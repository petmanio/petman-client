import { ShelterActions, ShelterActionTypes } from '../actions/shelter.actions';
import { createSelector } from '@ngrx/store';
import { find } from 'lodash';

import { ShelterDto, UserDto } from '@petman/common';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface State extends EntityState<ShelterDto> {
  selectedId: number | null;
  total: number;
}

export const adapter: EntityAdapter<ShelterDto> = createEntityAdapter<ShelterDto>({
  selectId: (s: ShelterDto) => s.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  selectedId: null,
  total: null
});

export function reducer(state = initialState, action: ShelterActions): State {
  switch (action.type) {
    case ShelterActionTypes.CREATE_SUCCESS:
      return { ...state, ...adapter.addOne(action.payload, state), total: state.total + 1 };

    case ShelterActionTypes.UPDATE_SUCCESS:
      return { ...state, ...adapter.updateOne({ id: action.payload.id, changes: action.payload }, state) };

    case ShelterActionTypes.DELETE_SUCCESS:
      return { ...state, ...adapter.removeOne(action.payload, state), total: state.total + 1 };

    case ShelterActionTypes.LOAD_SUCCESS:
      return { ...state, ...adapter.addOne(action.payload, state) };

    case ShelterActionTypes.LIST_SUCCESS:
      return { ...state, ...adapter.addAll(action.payload.list, state), total: action.payload.total };

    case ShelterActionTypes.MORE_SUCCESS:
      return { ...state, ...adapter.addMany(action.payload.list, state), total: action.payload.total };

    case ShelterActionTypes.SELECT:
      return { ...state, selectedId: action.payload };

    default:
      return state;
    }
}

export const getSelectedId = (state: State) => state.selectedId;
export const getTotal = (state: State) => state.total;
