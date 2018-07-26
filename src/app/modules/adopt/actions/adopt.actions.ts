import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';

import {
  ListQueryRequestDto,
  AdoptDto,
  AdoptListResponseDto,
  AdoptRequestDto
} from '@petman/common';

export enum AdoptActionTypes {
  CREATE = '[Adopt] Create',
  CREATE_FAILURE = '[Adopt] Create failure',
  CREATE_SUCCESS = '[Adopt] Create success',

  UPDATE = '[Adopt] Update',
  UPDATE_SUCCESS = '[Adopt] Update success',
  UPDATE_FAILURE = '[Adopt] Update failure',

  DELETE = '[Adopt] Delete',
  DELETE_SUCCESS = '[Adopt] Delete success',
  DELETE_FAILURE = '[Adopt] Delete failure',

  LOAD = '[Adopt] Load',
  LOAD_SUCCESS = '[Adopt] Load success',
  LOAD_FAILURE = '[Adopt] Load failure',

  LIST = '[Adopt] List',
  LIST_FAILURE = '[Adopt] List failure',
  LIST_SUCCESS = '[Adopt] List success',

  MORE = '[Adopt] More',
  MORE_SUCCESS = '[Adopt] More success',
  MORE_FAILURE = '[Adopt] More failure',

  SELECT = '[Adopt] Select'
}

/**
 * Create
 */
export class Create implements Action {
  readonly type = AdoptActionTypes.CREATE;

  constructor(public payload: AdoptRequestDto) {}
}

export class CreateSuccess implements Action {
  readonly type = AdoptActionTypes.CREATE_SUCCESS;

  constructor(public payload: AdoptDto) {}
}

export class CreateFailure implements Action {
  readonly type = AdoptActionTypes.CREATE_FAILURE;

  constructor(public payload: HttpErrorResponse) {}
}

/**
 * Update
 */
export class Update implements Action {
  readonly type = AdoptActionTypes.UPDATE;

  constructor(public payload: { id: number; body: AdoptDto }) {}
}

export class UpdateSuccess implements Action {
  readonly type = AdoptActionTypes.UPDATE_SUCCESS;

  constructor(public payload: AdoptDto) {}
}

export class UpdateFailure implements Action {
  readonly type = AdoptActionTypes.UPDATE_FAILURE;

  constructor(public payload: HttpErrorResponse) {}
}

/**
 * Delete
 */
export class Delete implements Action {
  readonly type = AdoptActionTypes.DELETE;

  constructor(public payload: number) {}
}

export class DeleteSuccess implements Action {
  readonly type = AdoptActionTypes.DELETE_SUCCESS;

  constructor(public payload: number) {}
}

export class DeleteFailure implements Action {
  readonly type = AdoptActionTypes.DELETE_FAILURE;

  constructor(public payload: HttpErrorResponse) {}
}

/**
 * Load
 */
export class Load implements Action {
  readonly type = AdoptActionTypes.LOAD;

  constructor(public payload: number) {}
}

export class LoadSuccess implements Action {
  readonly type = AdoptActionTypes.LOAD_SUCCESS;

  constructor(public payload: AdoptDto) {}
}

export class LoadFailure implements Action {
  readonly type = AdoptActionTypes.LOAD_FAILURE;

  constructor(public payload: HttpErrorResponse) {}
}

/**
 * List
 */
export class List implements Action {
  readonly type = AdoptActionTypes.LIST;

  constructor(public payload: ListQueryRequestDto) {}
}

export class ListSuccess implements Action {
  readonly type = AdoptActionTypes.LIST_SUCCESS;

  constructor(public payload: AdoptListResponseDto) {}
}

export class ListFailure implements Action {
  readonly type = AdoptActionTypes.LIST_FAILURE;

  constructor(public payload: HttpErrorResponse) {}
}

/**
 * More
 */
export class More implements Action {
  readonly type = AdoptActionTypes.MORE;

  constructor(public payload: ListQueryRequestDto) {}
}

export class MoreSuccess implements Action {
  readonly type = AdoptActionTypes.MORE_SUCCESS;

  constructor(public payload: AdoptListResponseDto) {}
}

export class MoreFailure implements Action {
  readonly type = AdoptActionTypes.MORE_FAILURE;

  constructor(public payload: HttpErrorResponse) {}
}

/**
 * Shared
 */
export class Select implements Action {
  readonly type = AdoptActionTypes.SELECT;

  constructor(public payload: number) {}
}

export type AdoptActions =
  | Create
  | CreateSuccess
  | CreateFailure
  | Update
  | UpdateSuccess
  | UpdateFailure
  | Delete
  | DeleteSuccess
  | DeleteFailure
  | Load
  | LoadSuccess
  | LoadFailure
  | List
  | ListSuccess
  | ListFailure
  | More
  | MoreSuccess
  | MoreFailure
  | Select;
