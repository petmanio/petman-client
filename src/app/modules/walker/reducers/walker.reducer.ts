import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { WalkerDto } from '@petman/common';

import { AuthActions, AuthActionTypes } from '@auth/actions/auth.actions';
import { WalkerActions, WalkerActionTypes } from '@walker/actions/walker.actions';

export interface State extends EntityState<WalkerDto> {
  selectedId: number;
  total: number;
  isListLoaded: boolean;
}

export const adapter: EntityAdapter<WalkerDto> = createEntityAdapter<WalkerDto>({
  selectId: (s: WalkerDto) => s.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  selectedId: null,
  total: null,
  isListLoaded: false
});

export function reducer(state = initialState, action: WalkerActions | AuthActions): State {
  switch (action.type) {
    case WalkerActionTypes.CREATE_SUCCESS:
      return { ...state, ...adapter.addOne(action.payload, state), total: state.total + 1 };

    case WalkerActionTypes.UPDATE_SUCCESS:
      return { ...state, ...adapter.updateOne({ id: action.payload.id, changes: action.payload }, state) };

    case WalkerActionTypes.DELETE_SUCCESS:
      return { ...state, ...adapter.removeOne(action.payload, state), total: state.total + 1 };

    case WalkerActionTypes.LOAD_SUCCESS:
      return { ...state, ...adapter.addOne(action.payload, state) };

    case WalkerActionTypes.LIST_SUCCESS:
      return { ...state, ...adapter.addAll(action.payload.list, state), total: action.payload.total, isListLoaded: true };

    case WalkerActionTypes.MORE_SUCCESS:
      return { ...state, ...adapter.addMany(action.payload.list, state), total: action.payload.total };

    case WalkerActionTypes.SELECT:
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
