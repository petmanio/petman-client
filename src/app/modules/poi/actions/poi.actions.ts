import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

import {
  CategoryListResponseDto,
  ListQueryRequestDto,
  PinDto,
  PoiDto,
  PoiListQueryRequestDto,
  PoiListResponseDto,
  PoiPinsQueryRequestDto
} from '@petman/common';

export enum PoiActionTypes {
  CREATE = '[Poi] Create',
  CREATE_FAILURE = '[Poi] Create failure',
  CREATE_SUCCESS = '[Poi] Create success',


  UPDATE = '[Poi] Update',
  UPDATE_SUCCESS = '[Poi] Update success',
  UPDATE_FAILURE = '[Poi] Update failure',

  DELETE = '[Poi] Delete',
  DELETE_SUCCESS = '[Poi] Delete success',
  DELETE_FAILURE = '[Poi] Delete failure',

  LOAD = '[Poi] Load',
  LOAD_SUCCESS = '[Poi] Load success',
  LOAD_FAILURE = '[Poi] Load failure',

  LIST = '[Poi] List',
  LIST_FAILURE = '[Poi] List failure',
  LIST_SUCCESS = '[Poi] List success',

  MORE = '[Poi] More',
  MORE_SUCCESS = '[Poi] More success',
  MORE_FAILURE = '[Poi] More failure',

  PINS = '[Poi] Pins',
  PINS_FAILURE = '[Poi] Pins failure',
  PINS_SUCCESS = '[Poi] Pins success',

  CATEGORIES = '[Poi] Categories',
  CATEGORIES_FAILURE = '[Poi] Categories failure',
  CATEGORIES_SUCCESS = '[Poi] Categories success',

  SELECT = '[Poi] Select'
}

/**
 * Create
 */
export class Create implements Action {
  readonly type = PoiActionTypes.CREATE;

  constructor(public payload: any) {
  }
}

export class CreateSuccess implements Action {
  readonly type = PoiActionTypes.CREATE_SUCCESS;

  constructor(public payload: PoiDto) {
  }
}

export class CreateFailure implements Action {
  readonly type = PoiActionTypes.CREATE_FAILURE;

  constructor(public payload: any) {
  }
}

/**
 * Update
 */
export class Update implements Action {
  readonly type = PoiActionTypes.UPDATE;

  constructor(public payload: PoiDto) {
  }
}

export class UpdateSuccess implements Action {
  readonly type = PoiActionTypes.UPDATE_SUCCESS;

  constructor(public payload: PoiDto) {
  }
}

export class UpdateFailure implements Action {
  readonly type = PoiActionTypes.UPDATE_FAILURE;

  constructor(public payload: any) {
  }
}

/**
 * Delete
 */
export class Delete implements Action {
  readonly type = PoiActionTypes.DELETE;

  constructor(public payload: number) {
  }
}

export class DeleteSuccess implements Action {
  readonly type = PoiActionTypes.DELETE_SUCCESS;

  constructor(public payload: number) {
  }
}

export class DeleteFailure implements Action {
  readonly type = PoiActionTypes.DELETE_FAILURE;

  constructor(public payload: HttpErrorResponse) {
  }
}

/**
 * Load
 */
export class Load implements Action {
  readonly type = PoiActionTypes.LOAD;

  constructor(public payload: number) {
  }
}

export class LoadSuccess implements Action {
  readonly type = PoiActionTypes.LOAD_SUCCESS;

  constructor(public payload: PoiDto) {
  }
}

export class LoadFailure implements Action {
  readonly type = PoiActionTypes.LOAD_FAILURE;

  constructor(public payload: HttpErrorResponse) {
  }
}

/**
 * List
 */
export class List implements Action {
  readonly type = PoiActionTypes.LIST;

  constructor(public payload: PoiListQueryRequestDto) {
  }
}

export class ListSuccess implements Action {
  readonly type = PoiActionTypes.LIST_SUCCESS;

  constructor(public payload: PoiListResponseDto) {
  }
}

export class ListFailure implements Action {
  readonly type = PoiActionTypes.LIST_FAILURE;

  constructor(public payload: HttpErrorResponse) {
  }
}

/**
 * More
 */
export class More implements Action {
  readonly type = PoiActionTypes.MORE;

  constructor(public payload: PoiListQueryRequestDto) {
  }
}

export class MoreSuccess implements Action {
  readonly type = PoiActionTypes.MORE_SUCCESS;

  constructor(public payload: PoiListResponseDto) {
  }
}

export class MoreFailure implements Action {
  readonly type = PoiActionTypes.MORE_FAILURE;

  constructor(public payload: HttpErrorResponse) {
  }
}


/**
 * Pins
 */
export class Pins implements Action {
  readonly type = PoiActionTypes.PINS;

  constructor(public payload: PoiPinsQueryRequestDto) {
  }
}

export class PinsSuccess implements Action {
  readonly type = PoiActionTypes.PINS_SUCCESS;

  constructor(public payload: PinDto[]) {
  }
}

export class PinsFailure implements Action {
  readonly type = PoiActionTypes.PINS_FAILURE;

  constructor(public payload: HttpErrorResponse) {
  }
}

/**
 * Categories
 */
export class Categories implements Action {
  readonly type = PoiActionTypes.CATEGORIES;

  constructor(public payload: ListQueryRequestDto) {
  }
}

export class CategoriesSuccess implements Action {
  readonly type = PoiActionTypes.CATEGORIES_SUCCESS;

  constructor(public payload: CategoryListResponseDto) {
  }
}

export class CategoriesFailure implements Action {
  readonly type = PoiActionTypes.CATEGORIES_FAILURE;

  constructor(public payload: HttpErrorResponse) {
  }
}

/**
 * Shared
 */
export class Select implements Action {
  readonly type = PoiActionTypes.SELECT;

  constructor(public payload: number) {
  }
}

export type PoiActions =
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
  | Categories
  | CategoriesSuccess
  | CategoriesFailure
  | Select;
