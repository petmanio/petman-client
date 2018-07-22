import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { AdoptDto } from '@petman/common';

import { AuthActions, AuthActionTypes } from '@auth/actions/auth.actions';
import { AdoptActions, AdoptActionTypes } from '@adopt/actions/adopt.actions';

export interface State extends EntityState<AdoptDto> {
  selectedId: number;
  total: number;
  isListLoaded: boolean;
}

export const adapter: EntityAdapter<AdoptDto> = createEntityAdapter<AdoptDto>({
  selectId: (s: AdoptDto) => s.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  selectedId: null,
  total: null,
  isListLoaded: false
});

export function reducer(state = initialState, action: AdoptActions | AuthActions): State {
  switch (action.type) {
    case AdoptActionTypes.CREATE_SUCCESS:
      return { ...state, ...adapter.addOne(action.payload, state), total: state.total + 1 };

    case AdoptActionTypes.UPDATE_SUCCESS:
      return { ...state, ...adapter.updateOne({ id: action.payload.id, changes: action.payload }, state) };

    case AdoptActionTypes.DELETE_SUCCESS:
      return { ...state, ...adapter.removeOne(action.payload, state), total: state.total + 1 };

    case AdoptActionTypes.LOAD_SUCCESS:
      return { ...state, ...adapter.addOne(action.payload, state) };

    case AdoptActionTypes.LIST_SUCCESS:
      return { ...state, ...adapter.addAll(action.payload.list, state), total: action.payload.total, isListLoaded: true };

    case AdoptActionTypes.MORE_SUCCESS:
      return { ...state, ...adapter.addMany(action.payload.list, state), total: action.payload.total };

    case AdoptActionTypes.SELECT:
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
