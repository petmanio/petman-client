import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';

import { UserDto, UserUpdateRequestDto, UserGeoDto } from '@petman/common';

export enum UserActionTypes {
  GEOLOCATION = '[User] Geolocation',
  GEOLOCATION_SUCCESS = '[User] Geolocation success',
  GEOLOCATION_FAILURE = '[User] Geolocation failure',

  UPDATE = '[User] Update',
  UPDATE_SUCCESS = '[User] Update success',
  UPDATE_FAILURE = '[User] Update failure',

  LOAD = '[User] Load',
  LOAD_SUCCESS = '[User] Load success',
  LOAD_FAILURE = '[User] Load failure',

  SELECT = '[User] Select'
}

/**
 * Geolocation
 */
export class Geolocation implements Action {
  readonly type = UserActionTypes.GEOLOCATION;
}

export class GeolocationSuccess implements Action {
  readonly type = UserActionTypes.GEOLOCATION_SUCCESS;

  constructor(public payload: UserGeoDto) {}
}

export class GeolocationFailure implements Action {
  readonly type = UserActionTypes.GEOLOCATION_FAILURE;

  constructor(public payload: HttpErrorResponse) {}
}

/**
 * Update
 */
export class Update implements Action {
  readonly type = UserActionTypes.UPDATE;

  constructor(public payload: { id: number; body: UserUpdateRequestDto }) {}
}

export class UpdateSuccess implements Action {
  readonly type = UserActionTypes.UPDATE_SUCCESS;

  constructor(public payload: UserDto) {}
}

export class UpdateFailure implements Action {
  readonly type = UserActionTypes.UPDATE_FAILURE;

  constructor(public payload: HttpErrorResponse) {}
}

/**
 * Load
 */
export class Load implements Action {
  readonly type = UserActionTypes.LOAD;

  constructor(public payload: number) {}
}

export class LoadSuccess implements Action {
  readonly type = UserActionTypes.LOAD_SUCCESS;

  constructor(public payload: UserDto) {}
}

export class LoadFailure implements Action {
  readonly type = UserActionTypes.LOAD_FAILURE;

  constructor(public payload: HttpErrorResponse) {}
}

/**
 * Shared
 */
export class Select implements Action {
  readonly type = UserActionTypes.SELECT;

  constructor(public payload: number) {}
}

export type UserActions =
  | Update
  | UpdateSuccess
  | UpdateFailure
  | Geolocation
  | GeolocationSuccess
  | GeolocationFailure
  | Load
  | LoadSuccess
  | LoadFailure
  | Select;
