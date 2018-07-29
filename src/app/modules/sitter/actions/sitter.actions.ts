import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';

import {
  ListQueryRequestDto,
  SitterDto,
  SitterListResponseDto,
  SitterRequestDto
} from '@petman/common';

export enum SitterActionTypes {
  CREATE = '[Sitter] Create',
  CREATE_FAILURE = '[Sitter] Create failure',
  CREATE_SUCCESS = '[Sitter] Create success',

  UPDATE = '[Sitter] Update',
  UPDATE_SUCCESS = '[Sitter] Update success',
  UPDATE_FAILURE = '[Sitter] Update failure',

  DELETE = '[Sitter] Delete',
  DELETE_SUCCESS = '[Sitter] Delete success',
  DELETE_FAILURE = '[Sitter] Delete failure',

  LOAD = '[Sitter] Load',
  LOAD_SUCCESS = '[Sitter] Load success',
  LOAD_FAILURE = '[Sitter] Load failure',

  LIST = '[Sitter] List',
  LIST_FAILURE = '[Sitter] List failure',
  LIST_SUCCESS = '[Sitter] List success',

  MORE = '[Sitter] More',
  MORE_SUCCESS = '[Sitter] More success',
  MORE_FAILURE = '[Sitter] More failure',

  SELECT = '[Sitter] Select'
}

/**
 * Create
 */
export class Create implements Action {
  readonly type = SitterActionTypes.CREATE;

  constructor(public payload: SitterRequestDto) {}
}

export class CreateSuccess implements Action {
  readonly type = SitterActionTypes.CREATE_SUCCESS;

  constructor(public payload: SitterDto) {}
}

export class CreateFailure implements Action {
  readonly type = SitterActionTypes.CREATE_FAILURE;

  constructor(public payload: HttpErrorResponse) {}
}

/**
 * Update
 */
export class Update implements Action {
  readonly type = SitterActionTypes.UPDATE;

  constructor(public payload: { id: number; body: SitterDto }) {}
}

export class UpdateSuccess implements Action {
  readonly type = SitterActionTypes.UPDATE_SUCCESS;

  constructor(public payload: SitterDto) {}
}

export class UpdateFailure implements Action {
  readonly type = SitterActionTypes.UPDATE_FAILURE;

  constructor(public payload: HttpErrorResponse) {}
}

/**
 * Delete
 */
export class Delete implements Action {
  readonly type = SitterActionTypes.DELETE;

  constructor(public payload: number) {}
}

export class DeleteSuccess implements Action {
  readonly type = SitterActionTypes.DELETE_SUCCESS;

  constructor(public payload: number) {}
}

export class DeleteFailure implements Action {
  readonly type = SitterActionTypes.DELETE_FAILURE;

  constructor(public payload: HttpErrorResponse) {}
}

/**
 * Load
 */
export class Load implements Action {
  readonly type = SitterActionTypes.LOAD;

  constructor(public payload: number) {}
}

export class LoadSuccess implements Action {
  readonly type = SitterActionTypes.LOAD_SUCCESS;

  constructor(public payload: SitterDto) {}
}

export class LoadFailure implements Action {
  readonly type = SitterActionTypes.LOAD_FAILURE;

  constructor(public payload: HttpErrorResponse) {}
}

/**
 * List
 */
export class List implements Action {
  readonly type = SitterActionTypes.LIST;

  constructor(public payload: ListQueryRequestDto) {}
}

export class ListSuccess implements Action {
  readonly type = SitterActionTypes.LIST_SUCCESS;

  constructor(public payload: SitterListResponseDto) {}
}

export class ListFailure implements Action {
  readonly type = SitterActionTypes.LIST_FAILURE;

  constructor(public payload: HttpErrorResponse) {}
}

/**
 * More
 */
export class More implements Action {
  readonly type = SitterActionTypes.MORE;

  constructor(public payload: ListQueryRequestDto) {}
}

export class MoreSuccess implements Action {
  readonly type = SitterActionTypes.MORE_SUCCESS;

  constructor(public payload: SitterListResponseDto) {}
}

export class MoreFailure implements Action {
  readonly type = SitterActionTypes.MORE_FAILURE;

  constructor(public payload: HttpErrorResponse) {}
}

/**
 * Shared
 */
export class Select implements Action {
  readonly type = SitterActionTypes.SELECT;

  constructor(public payload: number) {}
}

export type SitterActions =
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
