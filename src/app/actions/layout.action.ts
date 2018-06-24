import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
  OPEN_SIDENAV = '[Layout] Open sidenav',
  CLOSE_SIDENAV = '[Layout] Close sidenav',
}

export class OpenSidenav implements Action {
  readonly type = LayoutActionTypes.OPEN_SIDENAV;
}

export class CloseSidenav implements Action {
  readonly type = LayoutActionTypes.CLOSE_SIDENAV;
}

export type LayoutActions = OpenSidenav | CloseSidenav;
