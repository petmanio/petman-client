import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';

import { UserDto, UserUpdateRequestDto, } from '@petman/common';

export enum UserActionTypes {
  UPDATE = '[User] Update',
  UPDATE_SUCCESS = '[User] Update success',
  UPDATE_FAILURE = '[User] Update failure'
}

/**
 * Update
 */
export class Update implements Action {
  readonly type = UserActionTypes.UPDATE;

  constructor(public payload: { id: number, body: UserUpdateRequestDto }) {
  }
}

export class UpdateSuccess implements Action {
  readonly type = UserActionTypes.UPDATE_SUCCESS;

  constructor(public payload: UserDto) {
  }
}

export class UpdateFailure implements Action {
  readonly type = UserActionTypes.UPDATE_FAILURE;

  constructor(public payload: HttpErrorResponse) {
  }
}

export type UserActions = Update
  | UpdateSuccess
  | UpdateFailure;
