import { HttpErrorResponse } from '@angular/common/http';
import { AuthActions } from '@auth/actions/auth.actions';

export interface State {
  sample: HttpErrorResponse;
}

export const initialState: State = {
  sample: null,
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    default:
      return state;
  }
}
