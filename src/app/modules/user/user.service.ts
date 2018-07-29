import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

import { UserDto, UserUpdateRequestDto, UserGeoDto } from '@petman/common';

import { environment } from '@environments/environment';
import { UserModule } from '@user/user.module';

@Injectable({
  providedIn: UserModule
})
export class UserService {
  constructor(private http: HttpClient) {}

  geoloaction(): Observable<UserGeoDto> {
    return this.http
      .get<UserGeoDto>(`${environment.api}/api/users/geo`)
      .pipe(
        map(response =>
          plainToClass(UserGeoDto, response, { groups: ['petman-client'] })
        )
      );
  }

  update(id: number, body: UserUpdateRequestDto): Observable<UserDto> {
    return this.http
      .put<UserDto>(`${environment.api}/api/users/${id}`, body)
      .pipe(
        map(response =>
          plainToClass(UserDto, response, { groups: ['petman-client'] })
        )
      );
  }
}
