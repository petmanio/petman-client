import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

import * as fromAdopt from '@adopt/reducers';
import { AdoptService } from '@adopt/adopt.service';
import { LoadSuccess } from '@adopt/actions/adopt.actions';

@Injectable()
export class AdoptExistsGuard implements CanActivate {
  constructor(private store: Store<fromAdopt.State>, private router: Router, private adoptService: AdoptService) {
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
    return this.store.select(fromAdopt.getEntities)
      .pipe(
        map(entities => !!entities[id]),
        take(1)
      );
  }

  hasDataInApi(id: number): Observable<boolean> {
    return this.adoptService.getById(id)
      .pipe(
        map(entity => new LoadSuccess(entity)),
        tap((action: LoadSuccess) => this.store.dispatch(action)),
        map(adopt => !!adopt),
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
