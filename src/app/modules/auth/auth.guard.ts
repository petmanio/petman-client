import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';

import * as fromAuth from '@auth/reducers';
import { AuthService } from '@auth/auth.service';
import { LoginRedirect, UserSuccess } from '@auth/actions/auth.actions';

@Injectable()
export class AuthGuard implements CanActivate {
  private state: RouterStateSnapshot;
  constructor(private store: Store<fromAuth.State>, private authService: AuthService) {
  }

  hasUserInStore(): Observable<boolean> {
    return this.store.select(fromAuth.getUser)
      .pipe(
        map(user => !!user),
        take(1)
      );
  }

  hasUserInApi(): Observable<boolean> {
    return this.authService.user()
      .pipe(
        map(user => new UserSuccess(user)),
        tap((action: UserSuccess) => this.store.dispatch(action)),
        map(authed => !!authed),
        catchError(() => {
          this.store.dispatch(new LoginRedirect({ next: this.state.url }));
          return of(false);
        })
      );
  }

  authenticated(): Observable<boolean> {
    return this.hasUserInStore()
      .pipe(
        switchMap(inStore => {
          if (inStore) {
            return of(inStore);
          }
          return this.hasUserInApi();
        })
      );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    this.state = state;
    return this.authenticated();
  }
}
