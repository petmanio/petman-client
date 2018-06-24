import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';

import * as fromAuth from '@auth/reducers/auth.reducer';
import { AuthService } from '@auth/auth.service';
import { LoginRedirect, UserSuccess } from '@auth/actions/auth.actions';

@Injectable()
export class AuthGuard implements CanActivate {
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
          this.store.dispatch(new LoginRedirect({}));
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

  canActivate(): Observable<boolean> {
    return this.authenticated();
  }
}
