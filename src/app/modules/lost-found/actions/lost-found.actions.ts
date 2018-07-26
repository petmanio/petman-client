import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';

import {
  ListQueryRequestDto,
  LostFoundDto,
  LostFoundListResponseDto,
  LostFoundRequestDto
} from '@petman/common';

export enum LostFoundActionTypes {
  CREATE = '[LostFound] Create',
  CREATE_FAILURE = '[LostFound] Create failure',
  CREATE_SUCCESS = '[LostFound] Create success',

  UPDATE = '[LostFound] Update',
  UPDATE_SUCCESS = '[LostFound] Update success',
  UPDATE_FAILURE = '[LostFound] Update failure',

  DELETE = '[LostFound] Delete',
  DELETE_SUCCESS = '[LostFound] Delete success',
  DELETE_FAILURE = '[LostFound] Delete failure',

  LOAD = '[LostFound] Load',
  LOAD_SUCCESS = '[LostFound] Load success',
  LOAD_FAILURE = '[LostFound] Load failure',

  LIST = '[LostFound] List',
  LIST_FAILURE = '[LostFound] List failure',
  LIST_SUCCESS = '[LostFound] List success',

  MORE = '[LostFound] More',
  MORE_SUCCESS = '[LostFound] More success',
  MORE_FAILURE = '[LostFound] More failure',

  SELECT = '[LostFound] Select'
}

/**
 * Create
 */
export class Create implements Action {
  readonly type = LostFoundActionTypes.CREATE;

  constructor(public payload: LostFoundRequestDto) {}
}

export class CreateSuccess implements Action {
  readonly type = LostFoundActionTypes.CREATE_SUCCESS;

  constructor(public payload: LostFoundDto) {}
}

export class CreateFailure implements Action {
  readonly type = LostFoundActionTypes.CREATE_FAILURE;

  constructor(public payload: HttpErrorResponse) {}
}

/**
 * Update
 */
export class Update implements Action {
  readonly type = LostFoundActionTypes.UPDATE;

  constructor(public payload: { id: number; body: LostFoundDto }) {}
}

export class UpdateSuccess implements Action {
  readonly type = LostFoundActionTypes.UPDATE_SUCCESS;

  constructor(public payload: LostFoundDto) {}
}

export class UpdateFailure implements Action {
  readonly type = LostFoundActionTypes.UPDATE_FAILURE;

  constructor(public payload: HttpErrorResponse) {}
}

/**
 * Delete
 */
export class Delete implements Action {
  readonly type = LostFoundActionTypes.DELETE;

  constructor(public payload: number) {}
}

export class DeleteSuccess implements Action {
  readonly type = LostFoundActionTypes.DELETE_SUCCESS;

  constructor(public payload: number) {}
}

export class DeleteFailure implements Action {
  readonly type = LostFoundActionTypes.DELETE_FAILURE;

  constructor(public payload: HttpErrorResponse) {}
}

/**
 * Load
 */
export class Load implements Action {
  readonly type = LostFoundActionTypes.LOAD;

  constructor(public payload: number) {}
}

export class LoadSuccess implements Action {
  readonly type = LostFoundActionTypes.LOAD_SUCCESS;

  constructor(public payload: LostFoundDto) {}
}

export class LoadFailure implements Action {
  readonly type = LostFoundActionTypes.LOAD_FAILURE;

  constructor(public payload: HttpErrorResponse) {}
}

/**
 * List
 */
export class List implements Action {
  readonly type = LostFoundActionTypes.LIST;

  constructor(public payload: ListQueryRequestDto) {}
}

export class ListSuccess implements Action {
  readonly type = LostFoundActionTypes.LIST_SUCCESS;

  constructor(public payload: LostFoundListResponseDto) {}
}

export class ListFailure implements Action {
  readonly type = LostFoundActionTypes.LIST_FAILURE;

  constructor(public payload: HttpErrorResponse) {}
}

/**
 * More
 */
export class More implements Action {
  readonly type = LostFoundActionTypes.MORE;

  constructor(public payload: ListQueryRequestDto) {}
}

export class MoreSuccess implements Action {
  readonly type = LostFoundActionTypes.MORE_SUCCESS;

  constructor(public payload: LostFoundListResponseDto) {}
}

export class MoreFailure implements Action {
  readonly type = LostFoundActionTypes.MORE_FAILURE;

  constructor(public payload: HttpErrorResponse) {}
}

/**
 * Shared
 */
export class Select implements Action {
  readonly type = LostFoundActionTypes.SELECT;

  constructor(public payload: number) {}
}

export type LostFoundActions =
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
