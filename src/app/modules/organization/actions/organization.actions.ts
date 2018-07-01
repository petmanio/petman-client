import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

import {
  OrganizationDto,
  OrganizationListQueryRequestDto,
  OrganizationListResponseDto,
  OrganizationPinsQueryRequestDto,
  PinDto
} from '@petman/common';

export enum OrganizationActionTypes {
  CREATE = '[Organization] Create',
  CREATE_FAILURE = '[Organization] Create failure',
  CREATE_SUCCESS = '[Organization] Create success',


  UPDATE = '[Organization] Update',
  UPDATE_SUCCESS = '[Organization] Update success',
  UPDATE_FAILURE = '[Organization] Update failure',

  DELETE = '[Organization] Delete',
  DELETE_SUCCESS = '[Organization] Delete success',
  DELETE_FAILURE = '[Organization] Delete failure',

  LOAD = '[Organization] Load',
  LOAD_SUCCESS = '[Organization] Load success',
  LOAD_FAILURE = '[Organization] Load failure',

  LIST = '[Organization] List',
  LIST_FAILURE = '[Organization] List failure',
  LIST_SUCCESS = '[Organization] List success',

  MORE = '[Organization] More',
  MORE_SUCCESS = '[Organization] More success',
  MORE_FAILURE = '[Organization] More failure',

  PINS = '[Organization] Pins',
  PINS_FAILURE = '[Organization] Pins failure',
  PINS_SUCCESS = '[Organization] Pins success',

  SELECT = '[Organization] Select'
}

/**
 * Create
 */
export class Create implements Action {
  readonly type = OrganizationActionTypes.CREATE;

  constructor(public payload: any) {
  }
}

export class CreateSuccess implements Action {
  readonly type = OrganizationActionTypes.CREATE_SUCCESS;

  constructor(public payload: OrganizationDto) {
  }
}

export class CreateFailure implements Action {
  readonly type = OrganizationActionTypes.CREATE_FAILURE;

  constructor(public payload: any) {
  }
}

/**
 * Update
 */
export class Update implements Action {
  readonly type = OrganizationActionTypes.UPDATE;

  constructor(public payload: OrganizationDto) {
  }
}

export class UpdateSuccess implements Action {
  readonly type = OrganizationActionTypes.UPDATE_SUCCESS;

  constructor(public payload: OrganizationDto) {
  }
}

export class UpdateFailure implements Action {
  readonly type = OrganizationActionTypes.UPDATE_FAILURE;

  constructor(public payload: any) {
  }
}

/**
 * Delete
 */
export class Delete implements Action {
  readonly type = OrganizationActionTypes.DELETE;

  constructor(public payload: number) {
  }
}

export class DeleteSuccess implements Action {
  readonly type = OrganizationActionTypes.DELETE_SUCCESS;

  constructor(public payload: number) {
  }
}

export class DeleteFailure implements Action {
  readonly type = OrganizationActionTypes.DELETE_FAILURE;

  constructor(public payload: HttpErrorResponse) {
  }
}

/**
 * Load
 */
export class Load implements Action {
  readonly type = OrganizationActionTypes.LOAD;

  constructor(public payload: number) {
  }
}

export class LoadSuccess implements Action {
  readonly type = OrganizationActionTypes.LOAD_SUCCESS;

  constructor(public payload: OrganizationDto) {
  }
}

export class LoadFailure implements Action {
  readonly type = OrganizationActionTypes.LOAD_FAILURE;

  constructor(public payload: HttpErrorResponse) {
  }
}

/**
 * List
 */
export class List implements Action {
  readonly type = OrganizationActionTypes.LIST;

  constructor(public payload: OrganizationListQueryRequestDto) {
  }
}

export class ListSuccess implements Action {
  readonly type = OrganizationActionTypes.LIST_SUCCESS;

  constructor(public payload: OrganizationListResponseDto) {
  }
}

export class ListFailure implements Action {
  readonly type = OrganizationActionTypes.LIST_FAILURE;

  constructor(public payload: HttpErrorResponse) {
  }
}

/**
 * More
 */
export class More implements Action {
  readonly type = OrganizationActionTypes.MORE;

  constructor(public payload: OrganizationListQueryRequestDto) {
  }
}

export class MoreSuccess implements Action {
  readonly type = OrganizationActionTypes.MORE_SUCCESS;

  constructor(public payload: OrganizationListResponseDto) {
  }
}

export class MoreFailure implements Action {
  readonly type = OrganizationActionTypes.MORE_FAILURE;

  constructor(public payload: HttpErrorResponse) {
  }
}


/**
 * Pins
 */
export class Pins implements Action {
  readonly type = OrganizationActionTypes.PINS;

  constructor(public payload: OrganizationPinsQueryRequestDto) {
  }
}

export class PinsSuccess implements Action {
  readonly type = OrganizationActionTypes.PINS_SUCCESS;

  constructor(public payload: PinDto[]) {
  }
}

export class PinsFailure implements Action {
  readonly type = OrganizationActionTypes.PINS_FAILURE;

  constructor(public payload: HttpErrorResponse) {
  }
}

/**
 * Shared
 */
export class Select implements Action {
  readonly type = OrganizationActionTypes.SELECT;

  constructor(public payload: number) {
  }
}

export type OrganizationActions =
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
  | Pins
  | PinsSuccess
  | PinsFailure
  | Select;
