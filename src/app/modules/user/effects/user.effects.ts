import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { UserService } from '@user/user.service';
import { Update, UpdateFailure, UpdateSuccess, UserActionTypes } from '@user/actions/user.actions';

@Injectable()
export class UserEffects {

  @Effect()
  update$ = this.actions$
    .ofType(UserActionTypes.UPDATE)
    .pipe(
      map((action: Update) => action.payload),
      switchMap(({ id, body }) => {
        return this.userService.update(id, body)
          .pipe(
            map(response => new UpdateSuccess(response)),
            catchError(error => of(new UpdateFailure(error)))
          );
      })
    );

  constructor(private actions$: Actions, private userService: UserService) {
  }
}
