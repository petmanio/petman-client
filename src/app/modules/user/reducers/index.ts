import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromUser from '@user/reducers/user.reducer';

export interface State {
  user: fromUser.State;
}

export const reducers: ActionReducerMap<State> = {
  user: fromUser.reducer,
};

export const getSharedState = createFeatureSelector<State>('user');
