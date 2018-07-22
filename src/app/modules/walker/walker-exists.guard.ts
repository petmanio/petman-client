import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

import * as fromWalker from '@walker/reducers';
import { WalkerService } from '@walker/walker.service';
import { LoadSuccess } from '@walker/actions/walker.actions';

@Injectable()
export class WalkerExistsGuard implements CanActivate {
  constructor(private store: Store<fromWalker.State>, private router: Router, private walkerService: WalkerService) {
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
    return this.store.select(fromWalker.getEntities)
      .pipe(
        map(entities => !!entities[id]),
        take(1)
      );
  }

  hasDataInApi(id: number): Observable<boolean> {
    return this.walkerService.getById(id)
      .pipe(
        map(entity => new LoadSuccess(entity)),
        tap((action: LoadSuccess) => this.store.dispatch(action)),
        map(walker => !!walker),
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
