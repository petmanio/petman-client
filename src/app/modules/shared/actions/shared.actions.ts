import { Action } from '@ngrx/store';

export enum SharedActionTypes {
  SAMPLE = '[Shared] Sample'
}

/**
 * Sample
 */
export class Sample implements Action {
  readonly type = SharedActionTypes.SAMPLE;
}

export type SharedActions = Sample;
