import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

import * as fromUser from '@user/reducers';

@Injectable()
export class UserOwnerGuard implements CanActivate {
  constructor(private store: Store<fromUser.State>, private router: Router) {
  }

  isOwner(id: number): Observable<boolean> {
    return this.store.select(fromUser.getUserEntities)
      .pipe(
        filter(entities => !!entities[id]),
        map(entities => entities[id]),
        // TODO: update dto
        map(entity => entity && entity['isOwner']),
        take(1)
      );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.isOwner(route.params['id'])
      .pipe(
        switchMap(isOwner => {
          if (isOwner) {
            return of(isOwner);
          }
          this.router.navigate(['/404']);
          return of(false);
        })
      );
  }
}
