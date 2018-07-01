import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';

import { OrganizationService } from '@organization/organization.service';
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
  OrganizationActionTypes,
  Update,
  UpdateFailure,
  UpdateSuccess
} from '@organization/actions/organization.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class OrganizationEffects {

  @Effect()
  create$ = this.actions$
    .ofType(OrganizationActionTypes.CREATE)
    .pipe(
      map((action: Create) => action.payload),
      switchMap(organization => {
        return this.organizationService.create(organization)
          .pipe(
            map(response => new CreateSuccess(response)),
            catchError(error => of(new CreateFailure(error)))
          );
      })
    );

  @Effect({ dispatch: false })
  createSuccess$ = this.actions$
    .ofType(OrganizationActionTypes.CREATE_SUCCESS)
    .pipe(
      map((action: CreateSuccess) => action.payload),
      tap(organization => this.router.navigate(['organizations', organization.id]))
    );

  @Effect()
  update$ = this.actions$
    .ofType(OrganizationActionTypes.UPDATE)
    .pipe(
      map((action: Update) => action.payload),
      switchMap(organization => {
        return this.organizationService.update(organization)
          .pipe(
            map(response => new UpdateSuccess(response)),
            catchError(error => of(new UpdateFailure(error)))
          );
      })
    );

  @Effect({ dispatch: false })
  updateSuccess$ = this.actions$
    .ofType(OrganizationActionTypes.UPDATE_SUCCESS)
    .pipe(
      map((action: CreateSuccess) => action.payload),
      tap(organization => this.router.navigate(['organizations', organization.id]))
    );

  @Effect()
  delete$ = this.actions$
    .ofType(OrganizationActionTypes.DELETE)
    .pipe(
      map((action: Delete) => action.payload),
      switchMap(id => {
        return this.organizationService.delete(id)
          .pipe(
            map(() => new DeleteSuccess(id)),
            catchError(error => of(new DeleteFailure(error)))
          );
      })
    );

  @Effect({ dispatch: false })
  deleteSuccess$ = this.actions$
    .ofType(OrganizationActionTypes.DELETE_SUCCESS)
    .pipe(
      map((action: CreateSuccess) => action.payload),
      tap(organization => this.router.navigate(['organizations']))
    );

  @Effect()
  load$ = this.actions$
    .ofType(OrganizationActionTypes.LOAD)
    .pipe(
      map((action: Load) => action.payload),
      switchMap(id => {
        return this.organizationService.getById(id)
          .pipe(
            map(response => new LoadSuccess(response)),
            catchError(error => of(new LoadFailure(error)))
          );
      })
    );

  @Effect()
  list$ = this.actions$
    .ofType(OrganizationActionTypes.LIST)
    .pipe(
      map((action: List) => action.payload),
      switchMap(query => {
        return this.organizationService.list(query)
          .pipe(
            map(response => new ListSuccess(response)),
            catchError(error => of(new ListFailure(error)))
          );
      })
    );

  @Effect()
  more$ = this.actions$
    .ofType(OrganizationActionTypes.MORE)
    .pipe(
      map((action: More) => action.payload),
      switchMap(query => {
        return this.organizationService.list(query)
          .pipe(
            map(response => new MoreSuccess(response)),
            catchError(error => of(new MoreFailure(error)))
          );
      })
    );

  constructor(private router: Router, private actions$: Actions, private organizationService: OrganizationService) {
  }
}
