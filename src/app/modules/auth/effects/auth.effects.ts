import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { defer, Observable } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

import { AuthActionTypes, ChangeUser, FbLoginFailure, FbLoginSuccess, User, UserFailure, UserSuccess } from '@auth/actions/auth.actions';
import { AuthService } from '@auth/auth.service';

@Injectable()
export class AuthEffects {

  @Effect()
  fbLogin$ = this.actions$.pipe(
    ofType(AuthActionTypes.FB_LOGIN),
    switchMap(() => this.authService.getFacebookToken()),
    switchMap(accessToken => {
      return this.authService.fbLogin({ accessToken }).pipe(
        map(response => new FbLoginSuccess(response)),
        catchError(error => of(new FbLoginFailure(error)))
      );
    })
  );

  @Effect({ dispatch: false })
  fbLoginSuccess = this.actions$.pipe(
    ofType(AuthActionTypes.FB_LOGIN_SUCCESS),
    map(() => new User()),
    tap(() => this.router.navigate(['/']))
  );

  @Effect()
  user$ = this.actions$.pipe(
    ofType(AuthActionTypes.USER),
    switchMap(() => {
      return this.authService.user().pipe(
        map(response => new UserSuccess(response)),
        catchError(error => of(new UserFailure(error)))
      );
    })
  );

  @Effect({ dispatch: false })
  userChange$ = this.actions$.pipe(
    ofType(AuthActionTypes.CHANGE_USER),
    map((action: ChangeUser) => action.payload),
    tap((selectedUserId) => {
      this.authService.changeUser(selectedUserId);
    })
  );

  @Effect({ dispatch: false })
  loginRedirect = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_REDIRECT),
    tap(() => this.router.navigate(['/auth/login']))
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap(() => {
      this.authService.logOut();
      this.router.navigate(['/']);
    })
  );

  @Effect()
  init$: Observable<User> = defer(() => {
    return of(new User());
  });

  constructor(private router: Router, private actions$: Actions, private authService: AuthService) {
  }
}
