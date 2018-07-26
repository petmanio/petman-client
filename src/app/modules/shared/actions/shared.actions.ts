import { Action } from '@ngrx/store';

export enum SharedActionTypes {
  CLEAN_ERROR = '[Shared] Clean Error'
}

/**
 * Clean Error
 */
export class CleanError implements Action {
  readonly type = SharedActionTypes.CLEAN_ERROR;
}

export type SharedActions = CleanError;
