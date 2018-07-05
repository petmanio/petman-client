import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

import * as fromPoi from '@poi/reducers';
import { PoiService } from '@poi/poi.service';
import { LoadSuccess } from '@poi/actions/poi.actions';

@Injectable()
export class PoiExistsGuard implements CanActivate {
  constructor(private store: Store<fromPoi.State>, private router: Router, private poiService: PoiService) {
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
    return this.store.select(fromPoi.getEntities)
      .pipe(
        map(entities => !!entities[id]),
        take(1)
      );
  }

  hasDataInApi(id: number): Observable<boolean> {
    return this.poiService.getById(id)
      .pipe(
        map(entity => new LoadSuccess(entity)),
        tap((action: LoadSuccess) => this.store.dispatch(action)),
        map(poi => !!poi),
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
