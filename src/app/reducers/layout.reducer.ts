import { LayoutActions, LayoutActionTypes } from '@app/actions/layout.actions';

export interface State {
  showSidenav: boolean;
}

const initialState: State = {
  showSidenav: false,
};

export function reducer(state = initialState, action: LayoutActions): State {
  switch (action.type) {
    case LayoutActionTypes.CLOSE_SIDENAV:
      return { showSidenav: false };

    case LayoutActionTypes.OPEN_SIDENAV:
      return { showSidenav: true };

    default:
      return state;
  }
}

export const getShowSidenav = (state: State) => state.showSidenav;
