import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { ShelterDto } from '@petman/common';

import { AuthActions, AuthActionTypes } from '@auth/actions/auth.actions';
import { ShelterActions, ShelterActionTypes } from '@shelter/actions/shelter.actions';

export interface State extends EntityState<ShelterDto> {
  selectedId: number;
  total: number;
  isListLoaded: boolean;
}

export const adapter: EntityAdapter<ShelterDto> = createEntityAdapter<ShelterDto>({
  selectId: (s: ShelterDto) => s.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  selectedId: null,
  total: null,
  isListLoaded: false
});

export function reducer(state = initialState, action: ShelterActions | AuthActions): State {
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
      return { ...state, ...adapter.addAll(action.payload.list, state), total: action.payload.total, isListLoaded: true };

    case ShelterActionTypes.MORE_SUCCESS:
      return { ...state, ...adapter.addMany(action.payload.list, state), total: action.payload.total };

    case ShelterActionTypes.SELECT:
      return { ...state, selectedId: action.payload };

    case AuthActionTypes.FB_LOGIN:
    case AuthActionTypes.LOGOUT:
    case AuthActionTypes.CHANGE_USER:
      return { ...initialState };

    default:
      return state;
    }
}

export const getSelectedId = (state: State) => state.selectedId;
export const getTotal = (state: State) => state.total;
export const getIsListLoaded = (state: State) => state.isListLoaded;
