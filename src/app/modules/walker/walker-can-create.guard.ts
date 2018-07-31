import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map, switchMap, take, tap, filter } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

import * as fromAuth from '@auth/reducers';

@Injectable()
export class WalkerCanCreateGuard implements CanActivate {
  constructor(
    private store: Store<fromAuth.State>,
    private router: Router
  ) {}

  isWalker(id: number): Observable<boolean> {
    return this.store.select(fromAuth.getSelectedUser).pipe(
      filter(user => !!user),
      switchMap(selectedUser => {
        if (selectedUser.isWalker) {
          this.router.navigate(['/users', selectedUser.id]);
        }
        return of(!selectedUser.isWalker);
      }),
      take(1)
    );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.isWalker(route.params['id']);
  }
}
