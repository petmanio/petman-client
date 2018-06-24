import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { AuthService } from '@auth/auth.service';

@Injectable()
export class DenyAuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(): Observable<boolean> {
    return this.authService.user()
      .pipe(
        map(user => {
          if (user) {
            this.router.navigate(['/']);
          }
          return !user;
        }),
        catchError(() => of(true))
      );
  }
}
