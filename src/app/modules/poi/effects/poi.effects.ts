import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';

import { PoiService } from '@poi/poi.service';
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
  PoiActionTypes,
  Pins,
  PinsFailure,
  PinsSuccess,
  Update,
  UpdateFailure,
  UpdateSuccess, CategoriesFailure, CategoriesSuccess, Categories
} from '@poi/actions/poi.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class PoiEffects {

  @Effect()
  create$ = this.actions$
    .ofType(PoiActionTypes.CREATE)
    .pipe(
      map((action: Create) => action.payload),
      switchMap(poi => {
        return this.poiService.create(poi)
          .pipe(
            map(response => new CreateSuccess(response)),
            catchError(error => of(new CreateFailure(error)))
          );
      })
    );

  @Effect({ dispatch: false })
  createSuccess$ = this.actions$
    .ofType(PoiActionTypes.CREATE_SUCCESS)
    .pipe(
      map((action: CreateSuccess) => action.payload),
      tap(poi => this.router.navigate(['pois', poi.id]))
    );

  @Effect()
  update$ = this.actions$
    .ofType(PoiActionTypes.UPDATE)
    .pipe(
      map((action: Update) => action.payload),
      switchMap(poi => {
        return this.poiService.update(poi)
          .pipe(
            map(response => new UpdateSuccess(response)),
            catchError(error => of(new UpdateFailure(error)))
          );
      })
    );

  @Effect({ dispatch: false })
  updateSuccess$ = this.actions$
    .ofType(PoiActionTypes.UPDATE_SUCCESS)
    .pipe(
      map((action: CreateSuccess) => action.payload),
      tap(poi => this.router.navigate(['pois', poi.id]))
    );

  @Effect()
  delete$ = this.actions$
    .ofType(PoiActionTypes.DELETE)
    .pipe(
      map((action: Delete) => action.payload),
      switchMap(id => {
        return this.poiService.delete(id)
          .pipe(
            map(() => new DeleteSuccess(id)),
            catchError(error => of(new DeleteFailure(error)))
          );
      })
    );

  @Effect({ dispatch: false })
  deleteSuccess$ = this.actions$
    .ofType(PoiActionTypes.DELETE_SUCCESS)
    .pipe(
      map((action: CreateSuccess) => action.payload),
      tap(poi => this.router.navigate(['pois']))
    );

  @Effect()
  load$ = this.actions$
    .ofType(PoiActionTypes.LOAD)
    .pipe(
      map((action: Load) => action.payload),
      switchMap(id => {
        return this.poiService.getById(id)
          .pipe(
            map(response => new LoadSuccess(response)),
            catchError(error => of(new LoadFailure(error)))
          );
      })
    );

  @Effect()
  list$ = this.actions$
    .ofType(PoiActionTypes.LIST)
    .pipe(
      map((action: List) => action.payload),
      switchMap(query => {
        return this.poiService.list(query)
          .pipe(
            map(response => new ListSuccess(response)),
            catchError(error => of(new ListFailure(error)))
          );
      })
    );

  @Effect()
  more$ = this.actions$
    .ofType(PoiActionTypes.MORE)
    .pipe(
      map((action: More) => action.payload),
      switchMap(query => {
        return this.poiService.list(query)
          .pipe(
            map(response => new MoreSuccess(response)),
            catchError(error => of(new MoreFailure(error)))
          );
      })
    );

  @Effect()
  pins$ = this.actions$
    .ofType(PoiActionTypes.PINS)
    .pipe(
      map((action: Pins) => action.payload),
      switchMap(query => {
        return this.poiService.pins(query)
          .pipe(
            map(response => new PinsSuccess(response)),
            catchError(error => of(new PinsFailure(error)))
          );
      })
    );

  @Effect()
  categories$ = this.actions$
    .ofType(PoiActionTypes.CATEGORIES)
    .pipe(
      map((action: Categories) => action.payload),
      switchMap(query => {
        return this.poiService.categories(query)
          .pipe(
            map(response => new CategoriesSuccess(response)),
            catchError(error => of(new CategoriesFailure(error)))
          );
      })
    );

  constructor(private router: Router, private actions$: Actions, private poiService: PoiService) {
  }
}
