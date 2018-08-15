import { Inject, Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

import { LoginFacebookRequestDto, LoginFacebookResponseDto, UserDto } from '@petman/common';

import { environment } from '@environments/environment';
import { AppStorage } from '@storage/universal.inject';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, @Inject(AppStorage) private appStorage: Storage, private ngZone: NgZone) {}

  getFacebookToken(): Observable<string> {
    return new Observable(observer => {
      FB.login((response) => {
        this.ngZone.run(() => {
          if (response.authResponse) {
            observer.next(response.authResponse.accessToken);
          } else {
            // TODO: handle error
            observer.error(new Error());
          }
        });
      }, { scope: environment.fb.scope });
    });
  }

  fbLogin(options: LoginFacebookRequestDto): Observable<LoginFacebookResponseDto> {
    return this.http
      .post<LoginFacebookResponseDto>(`${environment.api}/api/auth/login/fb`, options).pipe(
        map(response => {
          this.appStorage.setItem('token', response.token);
          return response;
        })
      );
  }

  user(): Observable<UserDto> {
    return this.http
      .get<UserDto>(`${environment.api}/api/auth/user`, {}).pipe(
        map(response => plainToClass(UserDto, response, { groups: ['petman-client'] }))
      );
  }

  logOut() {
    this.appStorage.removeItem('token');
    this.appStorage.removeItem('selectedUserId');
  }

  changeUser(selectedUserId: number) {
    const storedSelectedId = parseInt(this.appStorage.getItem('selectedUserId'), 0);
    if (selectedUserId !== storedSelectedId) {
      this.appStorage.setItem('selectedUserId', selectedUserId.toString());
    }
  }
}
