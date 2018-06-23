import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { SharedService } from '@shared/services/shared/shared.service';
import { ServiceList, ServiceListFailure, ServiceListSuccess, SharedActionTypes } from '../actions/shared.actions';

@Injectable()
export class SharedEffects {
  @Effect()
  serviceList$ = this.actions$
    .ofType(SharedActionTypes.SERVICE_LIST)
    .pipe(
      map((action: ServiceList) => action.payload),
      switchMap(query => {
        return this.sharedService.serviceList(query)
          .pipe(
            map(response => new ServiceListSuccess(response)),
            catchError(error => of(new ServiceListFailure(error)))
          );
      })
    );

  constructor(private actions$: Actions, private sharedService: SharedService) {
  }
}
