import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
  OPEN_SIDENAV = '[Layout] Open sidenav',
  CLOSE_SIDENAV = '[Layout] Close sidenav',
  OPEN_MOBILE_FILTERS = '[Layout] Open mobile fIlters'
}

export class OpenSidenav implements Action {
  readonly type = LayoutActionTypes.OPEN_SIDENAV;
}

export class CloseSidenav implements Action {
  readonly type = LayoutActionTypes.CLOSE_SIDENAV;
}

export class OpenMobileFilters implements Action {
  readonly type = LayoutActionTypes.OPEN_MOBILE_FILTERS;
}

export type LayoutActions = OpenSidenav | CloseSidenav | OpenMobileFilters;
