import * as moment from 'moment';
import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { CookiesService } from '@ngx-utils/cookies';

import { LoginFacebookRequestDto, LoginFacebookResponseDto, UserDto } from '@petman/common';

import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private cookies: CookiesService, private ngZone: NgZone) {}

  getFacebookToken(): Observable<string> {
    return new Observable(observer => {
      FB.login(
        response => {
          this.ngZone.run(() => {
            if (response.authResponse) {
              observer.next(response.authResponse.accessToken);
            } else {
              // TODO: handle error
              observer.error(new Error());
            }
          });
        },
        { scope: environment.fb.scope }
      );
    });
  }

  fbLogin(options: LoginFacebookRequestDto): Observable<LoginFacebookResponseDto> {
    return this.http.post<LoginFacebookResponseDto>(`${environment.api}/api/auth/login/fb`, options).pipe(
      map(response => {
        this.cookies.put('token', response.token, {
          expires: moment(new Date())
            .add(1, 'month')
            .toDate()
        });
        return response;
      })
    );
  }

  user(): Observable<UserDto> {
    return this.http
      .get<UserDto>(`${environment.api}/api/auth/user`, {})
      .pipe(map(response => plainToClass(UserDto, response, { groups: ['petman-client'] })));
  }

  logOut() {
    this.cookies.remove('token');
    this.cookies.remove('selectedUserId');
  }

  changeUser(selectedUserId: number) {
    const storedSelectedId = parseInt(this.cookies.get('selectedUserId'), 0);
    if (selectedUserId !== storedSelectedId) {
      this.cookies.put('selectedUserId', selectedUserId.toString(), {
        expires: moment(new Date())
          .add(1, 'month')
          .toDate()
      });
    }
  }
}
