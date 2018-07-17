import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromShared from '@shared/reducers/shared.reducer';

export interface State {
  shared: fromShared.State;
}

export const reducers: ActionReducerMap<State> = {
  shared: fromShared.reducer,
};

export const getSharedState = createFeatureSelector<State>('shared');
