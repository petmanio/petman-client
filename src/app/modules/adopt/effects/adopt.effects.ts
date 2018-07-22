import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';

import { AdoptService } from '@adopt/adopt.service';
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
  AdoptActionTypes,
  Update,
  UpdateFailure,
  UpdateSuccess
} from '@adopt/actions/adopt.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AdoptEffects {

  @Effect()
  create$ = this.actions$
    .ofType(AdoptActionTypes.CREATE)
    .pipe(
      map((action: Create) => action.payload),
      switchMap(adopt => {
        return this.adoptService.create(adopt)
          .pipe(
            map(response => new CreateSuccess(response)),
            catchError(error => of(new CreateFailure(error)))
          );
      })
    );

  @Effect({ dispatch: false })
  createSuccess$ = this.actions$
    .ofType(AdoptActionTypes.CREATE_SUCCESS)
    .pipe(
      map((action: CreateSuccess) => action.payload),
      tap(adopt => this.router.navigate(['adoption', adopt.id]))
    );

  @Effect()
  update$ = this.actions$
    .ofType(AdoptActionTypes.UPDATE)
    .pipe(
      map((action: Update) => action.payload),
      switchMap(({ id, body }) => {
        return this.adoptService.update(id, body)
          .pipe(
            map(response => new UpdateSuccess(response)),
            catchError(error => of(new UpdateFailure(error)))
          );
      })
    );

  @Effect({ dispatch: false })
  updateSuccess$ = this.actions$
    .ofType(AdoptActionTypes.UPDATE_SUCCESS)
    .pipe(
      map((action: CreateSuccess) => action.payload),
      tap(adopt => this.router.navigate(['adoption', adopt.id]))
    );

  @Effect()
  delete$ = this.actions$
    .ofType(AdoptActionTypes.DELETE)
    .pipe(
      map((action: Delete) => action.payload),
      switchMap(id => {
        return this.adoptService.delete(id)
          .pipe(
            map(() => new DeleteSuccess(id)),
            catchError(error => of(new DeleteFailure(error)))
          );
      })
    );

  @Effect({ dispatch: false })
  deleteSuccess$ = this.actions$
    .ofType(AdoptActionTypes.DELETE_SUCCESS)
    .pipe(
      map((action: CreateSuccess) => action.payload),
      tap(adopt => this.router.navigate(['adoption']))
    );

  @Effect()
  load$ = this.actions$
    .ofType(AdoptActionTypes.LOAD)
    .pipe(
      map((action: Load) => action.payload),
      switchMap(id => {
        return this.adoptService.getById(id)
          .pipe(
            map(response => new LoadSuccess(response)),
            catchError(error => of(new LoadFailure(error)))
          );
      })
    );

  @Effect()
  list$ = this.actions$
    .ofType(AdoptActionTypes.LIST)
    .pipe(
      map((action: List) => action.payload),
      switchMap(query => {
        return this.adoptService.list(query)
          .pipe(
            map(response => new ListSuccess(response)),
            catchError(error => of(new ListFailure(error)))
          );
      })
    );

  @Effect()
  more$ = this.actions$
    .ofType(AdoptActionTypes.MORE)
    .pipe(
      map((action: More) => action.payload),
      switchMap(query => {
        return this.adoptService.list(query)
          .pipe(
            map(response => new MoreSuccess(response)),
            catchError(error => of(new MoreFailure(error)))
          );
      })
    );

  constructor(private router: Router, private actions$: Actions, private adoptService: AdoptService) {
  }
}
