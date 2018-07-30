import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { SitterDto } from '@petman/common';

import { AuthActions, AuthActionTypes } from '@auth/actions/auth.actions';
import {
  SitterActions,
  SitterActionTypes
} from '@sitter/actions/sitter.actions';

export interface State extends EntityState<SitterDto> {
  selectedId: number;
  total: number;
  isListLoaded: boolean;
}

export const adapter: EntityAdapter<SitterDto> = createEntityAdapter<SitterDto>(
  {
    selectId: (s: SitterDto) => s.id,
    sortComparer: false
  }
);

export const initialState: State = adapter.getInitialState({
  selectedId: null,
  total: null,
  isListLoaded: false
});

export function reducer(
  state = initialState,
  action: SitterActions | AuthActions
): State {
  switch (action.type) {
    case SitterActionTypes.CREATE_SUCCESS:
      return {
        ...state,
        ...adapter.addOne(action.payload, state),
        total: state.total + 1
      };

    case SitterActionTypes.UPDATE_SUCCESS:
      return {
        ...state,
        ...adapter.updateOne(
          { id: action.payload.id, changes: action.payload },
          state
        )
      };

    case SitterActionTypes.DELETE_SUCCESS:
      return {
        ...state,
        ...adapter.removeOne(action.payload, state),
        total: state.total + 1
      };

    case SitterActionTypes.LOAD_SUCCESS:
      return { ...state, ...adapter.addOne(action.payload, state) };

    case SitterActionTypes.LIST_SUCCESS:
      return {
        ...state,
        ...adapter.addAll(action.payload.list, state),
        total: action.payload.total,
        isListLoaded: true
      };

    case SitterActionTypes.MORE_SUCCESS:
      return {
        ...state,
        ...adapter.addMany(action.payload.list, state),
        total: action.payload.total
      };

    case SitterActionTypes.SELECT:
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
