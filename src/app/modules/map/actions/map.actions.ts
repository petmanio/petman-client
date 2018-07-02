import { Action } from '@ngrx/store';

export enum MapActionTypes {
  SAMPLE = '[Map] Sample',
}

export class Sample implements Action {
  readonly type = MapActionTypes.SAMPLE;
}

export type MapActions = Sample;
