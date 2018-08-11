import forEach from 'lodash-es/forEach';
import omit from 'lodash-es/omit';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

import { AdoptListQueryRequestDto, AdoptDto, AdoptListResponseDto, AdoptRequestDto } from '@petman/common';

import { environment } from '@environments/environment';
import { AdoptModule } from '@adopt/adopt.module';

@Injectable({
  providedIn: AdoptModule
})
export class AdoptService {
  constructor(@Inject(PLATFORM_ID) protected platformId: Object, private http: HttpClient) {}

  create(body: AdoptRequestDto): Observable<AdoptDto> {
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
      .post<AdoptDto>(`${environment.api}/api/adoption`, formData)
      .pipe(map(response => plainToClass(AdoptDto, response, { groups: ['petman-client'] })));
  }

  update(id, body: AdoptRequestDto): Observable<AdoptDto> {
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
      .put<AdoptDto>(`${environment.api}/api/adoption/${id}`, formData)
      .pipe(map(response => plainToClass(AdoptDto, response, { groups: ['petman-client'] })));
  }

  delete(id: number): Observable<Object> {
    return this.http.delete(`${environment.api}/api/adoption/${id}`);
  }

  getById(id: number): Observable<AdoptDto> {
    return this.http
      .get<AdoptDto>(`${environment.api}/api/adoption/${id}`)
      .pipe(map(response => plainToClass(AdoptDto, response, { groups: ['petman-client'] })));
  }

  list(query: AdoptListQueryRequestDto): Observable<AdoptListResponseDto> {
    return this.http
      .get<AdoptListResponseDto>(`${environment.api}/api/adoption`, {
        params: <any>query
      })
      .pipe(
        map(response =>
          plainToClass(AdoptListResponseDto, response, {
            groups: ['petman-client']
          })
        )
      );
  }
}
