import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';

import { ListQueryRequestDto, WalkerDto, WalkerListResponseDto, WalkerRequestDto } from '@petman/common';

export enum WalkerActionTypes {
  CREATE = '[Walker] Create',
  CREATE_FAILURE = '[Walker] Create failure',
  CREATE_SUCCESS = '[Walker] Create success',


  UPDATE = '[Walker] Update',
  UPDATE_SUCCESS = '[Walker] Update success',
  UPDATE_FAILURE = '[Walker] Update failure',

  DELETE = '[Walker] Delete',
  DELETE_SUCCESS = '[Walker] Delete success',
  DELETE_FAILURE = '[Walker] Delete failure',

  LOAD = '[Walker] Load',
  LOAD_SUCCESS = '[Walker] Load success',
  LOAD_FAILURE = '[Walker] Load failure',

  LIST = '[Walker] List',
  LIST_FAILURE = '[Walker] List failure',
  LIST_SUCCESS = '[Walker] List success',

  MORE = '[Walker] More',
  MORE_SUCCESS = '[Walker] More success',
  MORE_FAILURE = '[Walker] More failure',

  SELECT = '[Walker] Select'
}

/**
 * Create
 */
export class Create implements Action {
  readonly type = WalkerActionTypes.CREATE;

  constructor(public payload: WalkerRequestDto) {
  }
}

export class CreateSuccess implements Action {
  readonly type = WalkerActionTypes.CREATE_SUCCESS;

  constructor(public payload: WalkerDto) {
  }
}

export class CreateFailure implements Action {
  readonly type = WalkerActionTypes.CREATE_FAILURE;

  constructor(public payload: HttpErrorResponse) {
  }
}

/**
 * Update
 */
export class Update implements Action {
  readonly type = WalkerActionTypes.UPDATE;

  constructor(public payload: { id: number, body: WalkerDto }) {
  }
}

export class UpdateSuccess implements Action {
  readonly type = WalkerActionTypes.UPDATE_SUCCESS;

  constructor(public payload: WalkerDto) {
  }
}

export class UpdateFailure implements Action {
  readonly type = WalkerActionTypes.UPDATE_FAILURE;

  constructor(public payload: HttpErrorResponse) {
  }
}

/**
 * Delete
 */
export class Delete implements Action {
  readonly type = WalkerActionTypes.DELETE;

  constructor(public payload: number) {
  }
}

export class DeleteSuccess implements Action {
  readonly type = WalkerActionTypes.DELETE_SUCCESS;

  constructor(public payload: number) {
  }
}

export class DeleteFailure implements Action {
  readonly type = WalkerActionTypes.DELETE_FAILURE;

  constructor(public payload: HttpErrorResponse) {
  }
}

/**
 * Load
 */
export class Load implements Action {
  readonly type = WalkerActionTypes.LOAD;

  constructor(public payload: number) {
  }
}

export class LoadSuccess implements Action {
  readonly type = WalkerActionTypes.LOAD_SUCCESS;

  constructor(public payload: WalkerDto) {
  }
}

export class LoadFailure implements Action {
  readonly type = WalkerActionTypes.LOAD_FAILURE;

  constructor(public payload: HttpErrorResponse) {
  }
}

/**
 * List
 */
export class List implements Action {
  readonly type = WalkerActionTypes.LIST;

  constructor(public payload: ListQueryRequestDto) {
  }
}

export class ListSuccess implements Action {
  readonly type = WalkerActionTypes.LIST_SUCCESS;

  constructor(public payload: WalkerListResponseDto) {
  }
}

export class ListFailure implements Action {
  readonly type = WalkerActionTypes.LIST_FAILURE;

  constructor(public payload: HttpErrorResponse) {
  }
}

/**
 * More
 */
export class More implements Action {
  readonly type = WalkerActionTypes.MORE;

  constructor(public payload: ListQueryRequestDto) {
  }
}

export class MoreSuccess implements Action {
  readonly type = WalkerActionTypes.MORE_SUCCESS;

  constructor(public payload: WalkerListResponseDto) {
  }
}

export class MoreFailure implements Action {
  readonly type = WalkerActionTypes.MORE_FAILURE;

  constructor(public payload: HttpErrorResponse) {
  }
}

/**
 * Shared
 */
export class Select implements Action {
  readonly type = WalkerActionTypes.SELECT;

  constructor(public payload: number) {
  }
}

export type WalkerActions = Create
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
