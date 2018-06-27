import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

import * as fromShelter from '@shelter/reducers';
import { ShelterService } from '@shelter/shelter.service';
import { LoadSuccess } from '@shelter/actions/shelter.actions';

@Injectable()
export class ShelterExistsGuard implements CanActivate {
  constructor(private store: Store<fromShelter.State>, private router: Router, private shelterService: ShelterService) {
  }

  hasData(id: number): Observable<boolean> {
    return this.hasDataInStore(id)
      .pipe(
        switchMap(inStore => {
          if (inStore) {
            return of(inStore);
          }
          return this.hasDataInApi(id);
        })
      );
  }

  hasDataInStore(id: number): Observable<boolean> {
    return this.store.select(fromShelter.getEntities)
      .pipe(
        map(entities => !!entities[id]),
        take(1)
      );
  }

  hasDataInApi(id: number): Observable<boolean> {
    return this.shelterService.getById(id)
      .pipe(
        map(entity => new LoadSuccess(entity)),
        tap((action: LoadSuccess) => this.store.dispatch(action)),
        map(shelter => !!shelter),
        catchError(() => {
          this.router.navigate(['/404']);
          return of(false);
        })
      );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.hasData(route.params['id']);
  }
}
