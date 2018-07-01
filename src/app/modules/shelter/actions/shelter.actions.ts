import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

import { ListQueryRequestDto, ShelterCreateRequestDto, ShelterDto, ShelterListResponseDto } from '@petman/common';

export enum ShelterActionTypes {
  CREATE = '[Shelter] Create',
  CREATE_FAILURE = '[Shelter] Create failure',
  CREATE_SUCCESS = '[Shelter] Create success',


  UPDATE = '[Shelter] Update',
  UPDATE_SUCCESS = '[Shelter] Update success',
  UPDATE_FAILURE = '[Shelter] Update failure',

  DELETE = '[Shelter] Delete',
  DELETE_SUCCESS = '[Shelter] Delete success',
  DELETE_FAILURE = '[Shelter] Delete failure',

  LOAD = '[Shelter] Load',
  LOAD_SUCCESS = '[Shelter] Load success',
  LOAD_FAILURE = '[Shelter] Load failure',

  LIST = '[Shelter] List',
  LIST_FAILURE = '[Shelter] List failure',
  LIST_SUCCESS = '[Shelter] List success',

  MORE = '[Shelter] More',
  MORE_SUCCESS = '[Shelter] More success',
  MORE_FAILURE = '[Shelter] More failure',

  SELECT = '[Shelter] Select'
}

/**
 * Create
 */
export class Create implements Action {
  readonly type = ShelterActionTypes.CREATE;

  constructor(public payload: ShelterCreateRequestDto) {
  }
}

export class CreateSuccess implements Action {
  readonly type = ShelterActionTypes.CREATE_SUCCESS;

  constructor(public payload: ShelterDto) {
  }
}

export class CreateFailure implements Action {
  readonly type = ShelterActionTypes.CREATE_FAILURE;

  constructor(public payload: any) {
  }
}

/**
 * Update
 */
export class Update implements Action {
  readonly type = ShelterActionTypes.UPDATE;

  constructor(public payload: ShelterDto) {
  }
}

export class UpdateSuccess implements Action {
  readonly type = ShelterActionTypes.UPDATE_SUCCESS;

  constructor(public payload: ShelterDto) {
  }
}

export class UpdateFailure implements Action {
  readonly type = ShelterActionTypes.UPDATE_FAILURE;

  constructor(public payload: any) {
  }
}

/**
 * Delete
 */
export class Delete implements Action {
  readonly type = ShelterActionTypes.DELETE;

  constructor(public payload: number) {
  }
}

export class DeleteSuccess implements Action {
  readonly type = ShelterActionTypes.DELETE_SUCCESS;

  constructor(public payload: number) {
  }
}

export class DeleteFailure implements Action {
  readonly type = ShelterActionTypes.DELETE_FAILURE;

  constructor(public payload: HttpErrorResponse) {
  }
}

/**
 * Load
 */
export class Load implements Action {
  readonly type = ShelterActionTypes.LOAD;

  constructor(public payload: number) {
  }
}

export class LoadSuccess implements Action {
  readonly type = ShelterActionTypes.LOAD_SUCCESS;

  constructor(public payload: ShelterDto) {
  }
}

export class LoadFailure implements Action {
  readonly type = ShelterActionTypes.LOAD_FAILURE;

  constructor(public payload: HttpErrorResponse) {
  }
}

/**
 * List
 */
export class List implements Action {
  readonly type = ShelterActionTypes.LIST;

  constructor(public payload: ListQueryRequestDto) {
  }
}

export class ListSuccess implements Action {
  readonly type = ShelterActionTypes.LIST_SUCCESS;

  constructor(public payload: ShelterListResponseDto) {
  }
}

export class ListFailure implements Action {
  readonly type = ShelterActionTypes.LIST_FAILURE;

  constructor(public payload: HttpErrorResponse) {
  }
}

/**
 * More
 */
export class More implements Action {
  readonly type = ShelterActionTypes.MORE;

  constructor(public payload: ListQueryRequestDto) {
  }
}

export class MoreSuccess implements Action {
  readonly type = ShelterActionTypes.MORE_SUCCESS;

  constructor(public payload: ShelterListResponseDto) {
  }
}

export class MoreFailure implements Action {
  readonly type = ShelterActionTypes.MORE_FAILURE;

  constructor(public payload: HttpErrorResponse) {
  }
}

/**
 * Shared
 */
export class Select implements Action {
  readonly type = ShelterActionTypes.SELECT;

  constructor(public payload: number) {
  }
}

export type ShelterActions =
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
