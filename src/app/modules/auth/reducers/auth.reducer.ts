import { Action } from '@ngrx/store';
import { AuthActions, AuthActionTypes } from '../actions/auth.actions';
import * as fromLoginPage from './login-page.reducer';

export interface State {

  loginPage: fromLoginPage.State;
}

export const initialState: State = {
  loginPage: fromLoginPage.initialState
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {

    case AuthActionTypes.LoadAuths:
      return state;


    default:
      return state;
  }
}
