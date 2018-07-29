import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of, Observable, defer } from 'rxjs';

import { UserService } from '@user/user.service';
import {
  Update,
  UpdateFailure,
  UpdateSuccess,
  Geolocation,
  UserActionTypes,
  GeolocationSuccess,
  GeolocationFailure
} from '@user/actions/user.actions';

@Injectable()
export class UserEffects {
  @Effect()
  update$ = this.actions$.ofType(UserActionTypes.UPDATE).pipe(
    map((action: Update) => action.payload),
    switchMap(({ id, body }) => {
      return this.userService.update(id, body).pipe(
        map(response => new UpdateSuccess(response)),
        catchError(error => of(new UpdateFailure(error)))
      );
    })
  );

  @Effect()
  geolocation$ = this.actions$.ofType(UserActionTypes.GEOLOCATION).pipe(
    switchMap(() => {
      return this.userService.geoloaction().pipe(
        map(response => new GeolocationSuccess(response)),
        catchError(error => of(new GeolocationFailure(error)))
      );
    })
  );

  @Effect() init$: Observable<Geolocation> = defer(() => of(new Geolocation()));

  constructor(private actions$: Actions, private userService: UserService) {}
}
