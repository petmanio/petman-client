import { createSelector } from '@ngrx/store';
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

import { UserGeoDto, UserDto, UserApplicationDto } from '@petman/common';

import { AuthActions, AuthActionTypes } from '@auth/actions/auth.actions';
import { UserActionTypes, UserActions } from '@user/actions/user.actions';

export interface ApplicationEntity {
  userId: number;
  list: UserApplicationDto[];
}

export interface State {
  geolocation: UserGeoDto;
  selectedId: number;
  userEntities: EntityState<UserDto>;
  applicationEntities: EntityState<ApplicationEntity>;
}

export const userAdapter: EntityAdapter<UserDto> = createEntityAdapter<UserDto>(
  {
    selectId: (s: UserDto) => s.id,
    sortComparer: false
  }
);

export const applicationAdapter: EntityAdapter<
  ApplicationEntity
> = createEntityAdapter<ApplicationEntity>({
  selectId: (s: ApplicationEntity) => s.userId,
  sortComparer: false
});

export const initialState: State = {
  geolocation: null,
  selectedId: null,
  userEntities: userAdapter.getInitialState({}),
  applicationEntities: applicationAdapter.getInitialState({})
};

export function reducer(
  state = initialState,
  action: UserActions | AuthActions
): State {
  switch (action.type) {
    case UserActionTypes.GEOLOCATION_SUCCESS:
      return { ...state, geolocation: action.payload };

    case UserActionTypes.UPDATE_SUCCESS:
      if (action.payload.id === state.selectedId) {
        return {
          ...state,
          ...{
            userEntities: userAdapter.updateOne(
              { id: action.payload.id, changes: action.payload },
              state.userEntities
            )
          }
        };
      } else {
        // TODO: implement state update for business users
        return { ...state };
      }

    case UserActionTypes.LOAD_SUCCESS:
      return {
        ...state,
        ...{
          userEntities: userAdapter.addOne(action.payload, state.userEntities)
        }
      };

    case UserActionTypes.APPLICATIONS_SUCCESS:
      return {
        ...state,
        ...{
          applicationEntities: applicationAdapter.addOne(
            action.payload,
            state.applicationEntities
          )
        }
      };

    case UserActionTypes.SELECT:
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

export const getGeolocation = (state: State) => state.geolocation;
export const getGeolocationCountry = createSelector(
  getGeolocation,
  geolocation => {
    return geolocation ? geolocation.country : null;
  }
);
