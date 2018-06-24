import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromAuth from '@auth/reducers/auth.reducer';
import * as fromLoginPage from '@auth/reducers/login-page.reducer';

export interface State {
  status: fromAuth.State;
  loginPage: fromLoginPage.State;
}

export const reducers: ActionReducerMap<State> = {
  status: fromAuth.reducer,
  loginPage: fromLoginPage.reducer
};

export const selectAuthState = createFeatureSelector<State>('auth');

export const getAuthStatusState = createSelector(selectAuthState, (state: State) => state.status);
export const getLoggedIn = createSelector(getAuthStatusState, fromAuth.getLoggedIn);
export const getUser = createSelector(getAuthStatusState, fromAuth.getUser);
export const getSelectedUser = createSelector(getAuthStatusState, fromAuth.getSelectedUser);

export const getLoginPageState = createSelector(selectAuthState, (state: State) => state.loginPage);
export const getLoginPageError = createSelector(getLoginPageState, fromLoginPage.getError);
export const getLoginPagePending = createSelector(getLoginPageState, fromLoginPage.getPending);
