import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';

import { WalkerService } from '@walker/walker.service';
import {
  Create,
  CreateFailure,
  CreateSuccess,
  Delete,
  DeleteFailure,
  DeleteSuccess,
  List,
  ListFailure,
  ListSuccess,
  Load,
  LoadFailure,
  LoadSuccess,
  More,
  MoreFailure,
  MoreSuccess,
  WalkerActionTypes,
  Update,
  UpdateFailure,
  UpdateSuccess
} from '@walker/actions/walker.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class WalkerEffects {

  @Effect()
  create$ = this.actions$
    .ofType(WalkerActionTypes.CREATE)
    .pipe(
      map((action: Create) => action.payload),
      switchMap(walker => {
        return this.walkerService.create(walker)
          .pipe(
            map(response => new CreateSuccess(response)),
            catchError(error => of(new CreateFailure(error)))
          );
      })
    );

  @Effect({ dispatch: false })
  createSuccess$ = this.actions$
    .ofType(WalkerActionTypes.CREATE_SUCCESS)
    .pipe(
      map((action: CreateSuccess) => action.payload),
      tap(walker => this.router.navigate(['walkers', walker.id]))
    );

  @Effect()
  update$ = this.actions$
    .ofType(WalkerActionTypes.UPDATE)
    .pipe(
      map((action: Update) => action.payload),
      switchMap(({ id, body }) => {
        return this.walkerService.update(id, body)
          .pipe(
            map(response => new UpdateSuccess(response)),
            catchError(error => of(new UpdateFailure(error)))
          );
      })
    );

  @Effect({ dispatch: false })
  updateSuccess$ = this.actions$
    .ofType(WalkerActionTypes.UPDATE_SUCCESS)
    .pipe(
      map((action: CreateSuccess) => action.payload),
      tap(walker => this.router.navigate(['walkers', walker.id]))
    );

  @Effect()
  delete$ = this.actions$
    .ofType(WalkerActionTypes.DELETE)
    .pipe(
      map((action: Delete) => action.payload),
      switchMap(id => {
        return this.walkerService.delete(id)
          .pipe(
            map(() => new DeleteSuccess(id)),
            catchError(error => of(new DeleteFailure(error)))
          );
      })
    );

  @Effect({ dispatch: false })
  deleteSuccess$ = this.actions$
    .ofType(WalkerActionTypes.DELETE_SUCCESS)
    .pipe(
      map((action: CreateSuccess) => action.payload),
      tap(walker => this.router.navigate(['walkers']))
    );

  @Effect()
  load$ = this.actions$
    .ofType(WalkerActionTypes.LOAD)
    .pipe(
      map((action: Load) => action.payload),
      switchMap(id => {
        return this.walkerService.getById(id)
          .pipe(
            map(response => new LoadSuccess(response)),
            catchError(error => of(new LoadFailure(error)))
          );
      })
    );

  @Effect()
  list$ = this.actions$
    .ofType(WalkerActionTypes.LIST)
    .pipe(
      map((action: List) => action.payload),
      switchMap(query => {
        return this.walkerService.list(query)
          .pipe(
            map(response => new ListSuccess(response)),
            catchError(error => of(new ListFailure(error)))
          );
      })
    );

  @Effect()
  more$ = this.actions$
    .ofType(WalkerActionTypes.MORE)
    .pipe(
      map((action: More) => action.payload),
      switchMap(query => {
        return this.walkerService.list(query)
          .pipe(
            map(response => new MoreSuccess(response)),
            catchError(error => of(new MoreFailure(error)))
          );
      })
    );

  constructor(private router: Router, private actions$: Actions, private walkerService: WalkerService) {
  }
}
