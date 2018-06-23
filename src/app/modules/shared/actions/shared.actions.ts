import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';

import { ListQueryDto, ServiceListDto } from '@petman/common';

export enum SharedActionTypes {
  SERVICE_LIST = '[Service] List',
  SERVICE_LIST_SUCCESS = '[Service] List Success',
  SERVICE_LIST_FAILURE = '[Service] List Failure',
}

/**
 * Service list
 */
export class ServiceList implements Action {
  readonly type = SharedActionTypes.SERVICE_LIST;

  constructor(public payload: ListQueryDto = null) {
  }
}

export class ServiceListSuccess implements Action {
  readonly type = SharedActionTypes.SERVICE_LIST_SUCCESS;

  constructor(public payload: ServiceListDto) {
  }
}

export class ServiceListFailure implements Action {
  readonly type = SharedActionTypes.SERVICE_LIST_FAILURE;

  constructor(public payload: HttpErrorResponse) {
  }
}

export type SharedActions =
  | ServiceList
  | ServiceListSuccess
  | ServiceListFailure;
