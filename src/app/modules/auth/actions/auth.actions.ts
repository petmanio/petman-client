import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginFacebookResponseDto, UserDto } from '@petman/common';

export enum AuthActionTypes {
  FB_LOGIN = '[Auth] Facebook login',
  FB_LOGIN_FAILURE = '[Auth] Facebook login failure',
  FB_LOGIN_SUCCESS = '[Auth] Facebook login success',

  USER = '[Auth] User',
  USER_FAILURE = '[Auth] User failure',
  USER_SUCCESS = '[Auth] User success',
  CHANGE_USER = '[Auth] Change user',

  LOGOUT = '[Auth] Logout',
  LOGIN_REDIRECT = '[Auth] Login redirect',
  CLEAR_ERROR = '[Auth] Clear error'
}

/**
 * FbLogin
 */
export class FbLogin implements Action {
  readonly type = AuthActionTypes.FB_LOGIN;
}

export class FbLoginFailure implements Action {
  readonly type = AuthActionTypes.FB_LOGIN_FAILURE;

  constructor(public payload: HttpErrorResponse) {
  }
}

export class FbLoginSuccess implements Action {
  readonly type = AuthActionTypes.FB_LOGIN_SUCCESS;

  constructor(public payload: LoginFacebookResponseDto) {
  }
}

/**
 * User
 */
export class User implements Action {
  readonly type = AuthActionTypes.USER;
}

export class UserFailure implements Action {
  readonly type = AuthActionTypes.USER_FAILURE;

  constructor(public payload: HttpErrorResponse) {
  }
}

export class UserSuccess implements Action {
  readonly type = AuthActionTypes.USER_SUCCESS;

  constructor(public payload: UserDto) {
  }
}

export class ChangeUser implements Action {
  readonly type = AuthActionTypes.CHANGE_USER;

  constructor(public payload: number) {
  }
}

/**
 * Shared
 */
export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT;

  constructor() {
  }
}

export class LoginRedirect implements Action {
  readonly type = AuthActionTypes.LOGIN_REDIRECT;

  constructor(public payload: { next?: string }) {
  }
}

export class ClearError implements Action {
  readonly type = AuthActionTypes.CLEAR_ERROR;
}

export type AuthActions =
  FbLogin
  | FbLoginFailure
  | FbLoginSuccess
  | User
  | UserFailure
  | UserSuccess
  | ChangeUser
  | Logout
  | LoginRedirect
  | ClearError;

