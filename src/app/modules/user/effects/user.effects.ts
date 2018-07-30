import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of, Observable, defer } from 'rxjs';

import { UserService } from '@user/user.service';
import {
  Update,
  UpdateFailure,
  UpdateSuccess,
  Load,
  LoadFailure,
  LoadSuccess,
  GeolocationSuccess,
  GeolocationFailure,
  UserActionTypes
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

  // @Effect({ dispatch: false })
  // updateSuccess$ = this.actions$.ofType(UserActionTypes.UPDATE_SUCCESS).pipe(
  //   map((action: UpdateSuccess) => action.payload),
  //   tap(user => this.router.navigate(['users', user.id]))
  // );

  @Effect()
  load$ = this.actions$.ofType(UserActionTypes.LOAD).pipe(
    map((action: Load) => action.payload),
    switchMap(id => {
      return this.userService.getById(id).pipe(
        map(response => new LoadSuccess(response)),
        catchError(error => of(new LoadFailure(error)))
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

  // TODO: init$ must be called only from client side;
  // @Effect() init$: Observable<Geolocation> = defer(() => of(new Geolocation()));

  constructor(
    private router: Router,
    private actions$: Actions,
    private userService: UserService
  ) {}
}
