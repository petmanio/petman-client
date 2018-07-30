import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';

import { SitterService } from '@sitter/sitter.service';
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
  SitterActionTypes,
  Update,
  UpdateFailure,
  UpdateSuccess
} from '@sitter/actions/sitter.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class SitterEffects {
  @Effect()
  create$ = this.actions$.ofType(SitterActionTypes.CREATE).pipe(
    map((action: Create) => action.payload),
    switchMap(sitter => {
      return this.sitterService.create(sitter).pipe(
        map(response => new CreateSuccess(response)),
        catchError(error => of(new CreateFailure(error)))
      );
    })
  );

  @Effect({ dispatch: false })
  createSuccess$ = this.actions$.ofType(SitterActionTypes.CREATE_SUCCESS).pipe(
    map((action: CreateSuccess) => action.payload),
    tap(sitter => this.router.navigate(['sitters', sitter.id]))
  );

  @Effect()
  update$ = this.actions$.ofType(SitterActionTypes.UPDATE).pipe(
    map((action: Update) => action.payload),
    switchMap(({ id, body }) => {
      return this.sitterService.update(id, body).pipe(
        map(response => new UpdateSuccess(response)),
        catchError(error => of(new UpdateFailure(error)))
      );
    })
  );

  @Effect({ dispatch: false })
  updateSuccess$ = this.actions$.ofType(SitterActionTypes.UPDATE_SUCCESS).pipe(
    map((action: UpdateSuccess) => action.payload),
    tap(sitter => this.router.navigate(['sitters', sitter.id]))
  );

  @Effect()
  delete$ = this.actions$.ofType(SitterActionTypes.DELETE).pipe(
    map((action: Delete) => action.payload),
    switchMap(id => {
      return this.sitterService.delete(id).pipe(
        map(() => new DeleteSuccess(id)),
        catchError(error => of(new DeleteFailure(error)))
      );
    })
  );

  @Effect({ dispatch: false })
  deleteSuccess$ = this.actions$.ofType(SitterActionTypes.DELETE_SUCCESS).pipe(
    map((action: CreateSuccess) => action.payload),
    tap(sitter => this.router.navigate(['sitters']))
  );

  @Effect()
  load$ = this.actions$.ofType(SitterActionTypes.LOAD).pipe(
    map((action: Load) => action.payload),
    switchMap(id => {
      return this.sitterService.getById(id).pipe(
        map(response => new LoadSuccess(response)),
        catchError(error => of(new LoadFailure(error)))
      );
    })
  );

  @Effect()
  list$ = this.actions$.ofType(SitterActionTypes.LIST).pipe(
    map((action: List) => action.payload),
    switchMap(query => {
      return this.sitterService.list(query).pipe(
        map(response => new ListSuccess(response)),
        catchError(error => of(new ListFailure(error)))
      );
    })
  );

  @Effect()
  more$ = this.actions$.ofType(SitterActionTypes.MORE).pipe(
    map((action: More) => action.payload),
    switchMap(query => {
      return this.sitterService.list(query).pipe(
        map(response => new MoreSuccess(response)),
        catchError(error => of(new MoreFailure(error)))
      );
    })
  );

  constructor(
    private router: Router,
    private actions$: Actions,
    private sitterService: SitterService
  ) {}
}
