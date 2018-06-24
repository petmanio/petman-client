import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

import * as fromAuth from '@auth/reducers/auth.reducer';
import { AuthService } from '@auth/auth.service';

@Injectable()
export class DenyAuthGuard implements CanActivate {
  constructor(private store: Store<fromAuth.State>, private authService: AuthService) {
  }

  canActivate(): Observable<boolean> {
    return this.authService.user()
      .pipe(
        map(user => !user),
        catchError(() => of(true))
      );
  }
}
