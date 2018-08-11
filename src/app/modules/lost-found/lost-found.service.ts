import forEach from 'lodash-es/forEach';
import omit from 'lodash-es/omit';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

import { LostFoundListQueryRequestDto, LostFoundDto, LostFoundListResponseDto, LostFoundRequestDto } from '@petman/common';

import { environment } from '@environments/environment';
import { LostFoundModule } from '@lost-found/lost-found.module';

@Injectable({
  providedIn: LostFoundModule
})
export class LostFoundService {
  constructor(@Inject(PLATFORM_ID) protected platformId: Object, private http: HttpClient) {}

  create(body: LostFoundRequestDto): Observable<LostFoundDto> {
    let formData: FormData;
    if (isPlatformBrowser(this.platformId)) {
      formData = new FormData();

      forEach(omit(body, 'images'), (value, key) => {
        if (value) {
          formData.append(key, value);
        }
      });

      if (body.images instanceof FileList) {
        forEach(body.images, file => formData.append('images', file, file.name));
      } else if (body.images instanceof File) {
        formData.append('images', body.images, body.images.name);
      }
    }
    return this.http
      .post<LostFoundDto>(`${environment.api}/api/lost-found`, formData)
      .pipe(map(response => plainToClass(LostFoundDto, response, { groups: ['petman-client'] })));
  }

  update(id, body: LostFoundRequestDto): Observable<LostFoundDto> {
    let formData: FormData;
    if (isPlatformBrowser(this.platformId)) {
      formData = new FormData();

      forEach(omit(body, 'images'), (value, key) => {
        if (value) {
          formData.append(key, value);
        }
      });

      if (body.images instanceof FileList) {
        forEach(body.images as any, file => formData.append('images', file, file.name));
      } else if (body.images instanceof File) {
        formData.append('images', body.images, body.images.name);
      } else {
        forEach(body.images as any, file => {
          if (file instanceof File) {
            formData.append('images', file, file.name);
          } else {
            formData.append('images', file);
          }
        });
      }
    }
    return this.http
      .put<LostFoundDto>(`${environment.api}/api/lost-found/${id}`, formData)
      .pipe(map(response => plainToClass(LostFoundDto, response, { groups: ['petman-client'] })));
  }

  delete(id: number): Observable<Object> {
    return this.http.delete(`${environment.api}/api/lost-found/${id}`);
  }

  getById(id: number): Observable<LostFoundDto> {
    return this.http
      .get<LostFoundDto>(`${environment.api}/api/lost-found/${id}`)
      .pipe(map(response => plainToClass(LostFoundDto, response, { groups: ['petman-client'] })));
  }

  list(query: LostFoundListQueryRequestDto): Observable<LostFoundListResponseDto> {
    return this.http
      .get<LostFoundListResponseDto>(`${environment.api}/api/lost-found`, {
        params: <any>query
      })
      .pipe(
        map(response =>
          plainToClass(LostFoundListResponseDto, response, {
            groups: ['petman-client']
          })
        )
      );
  }
}
