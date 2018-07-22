import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';

import { LostFoundService } from '@lost-found/lost-found.service';
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
  LostFoundActionTypes,
  Update,
  UpdateFailure,
  UpdateSuccess
} from '@lost-found/actions/lost-found.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class LostFoundEffects {

  @Effect()
  create$ = this.actions$
    .ofType(LostFoundActionTypes.CREATE)
    .pipe(
      map((action: Create) => action.payload),
      switchMap(lostFound => {
        return this.lostFoundService.create(lostFound)
          .pipe(
            map(response => new CreateSuccess(response)),
            catchError(error => of(new CreateFailure(error)))
          );
      })
    );

  @Effect({ dispatch: false })
  createSuccess$ = this.actions$
    .ofType(LostFoundActionTypes.CREATE_SUCCESS)
    .pipe(
      map((action: CreateSuccess) => action.payload),
      tap(lostFound => this.router.navigate(['lost-found', lostFound.id]))
    );

  @Effect()
  update$ = this.actions$
    .ofType(LostFoundActionTypes.UPDATE)
    .pipe(
      map((action: Update) => action.payload),
      switchMap(({ id, body }) => {
        return this.lostFoundService.update(id, body)
          .pipe(
            map(response => new UpdateSuccess(response)),
            catchError(error => of(new UpdateFailure(error)))
          );
      })
    );

  @Effect({ dispatch: false })
  updateSuccess$ = this.actions$
    .ofType(LostFoundActionTypes.UPDATE_SUCCESS)
    .pipe(
      map((action: CreateSuccess) => action.payload),
      tap(lostFound => this.router.navigate(['lost-found', lostFound.id]))
    );

  @Effect()
  delete$ = this.actions$
    .ofType(LostFoundActionTypes.DELETE)
    .pipe(
      map((action: Delete) => action.payload),
      switchMap(id => {
        return this.lostFoundService.delete(id)
          .pipe(
            map(() => new DeleteSuccess(id)),
            catchError(error => of(new DeleteFailure(error)))
          );
      })
    );

  @Effect({ dispatch: false })
  deleteSuccess$ = this.actions$
    .ofType(LostFoundActionTypes.DELETE_SUCCESS)
    .pipe(
      map((action: CreateSuccess) => action.payload),
      tap(lostFound => this.router.navigate(['lost-found']))
    );

  @Effect()
  load$ = this.actions$
    .ofType(LostFoundActionTypes.LOAD)
    .pipe(
      map((action: Load) => action.payload),
      switchMap(id => {
        return this.lostFoundService.getById(id)
          .pipe(
            map(response => new LoadSuccess(response)),
            catchError(error => of(new LoadFailure(error)))
          );
      })
    );

  @Effect()
  list$ = this.actions$
    .ofType(LostFoundActionTypes.LIST)
    .pipe(
      map((action: List) => action.payload),
      switchMap(query => {
        return this.lostFoundService.list(query)
          .pipe(
            map(response => new ListSuccess(response)),
            catchError(error => of(new ListFailure(error)))
          );
      })
    );

  @Effect()
  more$ = this.actions$
    .ofType(LostFoundActionTypes.MORE)
    .pipe(
      map((action: More) => action.payload),
      switchMap(query => {
        return this.lostFoundService.list(query)
          .pipe(
            map(response => new MoreSuccess(response)),
            catchError(error => of(new MoreFailure(error)))
          );
      })
    );

  constructor(private router: Router, private actions$: Actions, private lostFoundService: LostFoundService) {
  }
}
