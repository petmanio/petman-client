import forEach from 'lodash-es/forEach';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

import {
  ListQueryRequestDto,
  ShelterDto,
  ShelterListResponseDto,
  ShelterRequestDto
} from '@petman/common';

import { environment } from '@environments/environment';
import { ShelterModule } from '@shelter/shelter.module';

@Injectable({
  providedIn: ShelterModule
})
export class ShelterService {
  constructor(
    @Inject(PLATFORM_ID) protected platformId: Object,
    private http: HttpClient
  ) {}

  create(body: ShelterRequestDto): Observable<ShelterDto> {
    let formData: FormData;
    if (isPlatformBrowser(this.platformId)) {
      formData = new FormData();
      formData.append('description', body.description);
      formData.append('price', (body.price || '').toString());

      if (body.images instanceof FileList) {
        forEach(body.images, file =>
          formData.append('images', file, file.name)
        );
      } else if (body.images instanceof File) {
        formData.append('images', body.images, body.images.name);
      }
    }
    return this.http
      .post<ShelterDto>(`${environment.api}/api/shelters`, formData)
      .pipe(
        map(response =>
          plainToClass(ShelterDto, response, { groups: ['petman-client'] })
        )
      );
  }

  update(id, body: ShelterRequestDto): Observable<ShelterDto> {
    let formData: FormData;
    if (isPlatformBrowser(this.platformId)) {
      formData = new FormData();
      formData.append('description', body.description);
      formData.append('price', (body.price || '').toString());

      if (body.images instanceof FileList) {
        forEach(body.images as any, file =>
          formData.append('images', file, file.name)
        );
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
      .put<ShelterDto>(`${environment.api}/api/shelters/${id}`, formData)
      .pipe(
        map(response =>
          plainToClass(ShelterDto, response, { groups: ['petman-client'] })
        )
      );
  }

  delete(id: number): Observable<Object> {
    return this.http.delete(`${environment.api}/api/shelters/${id}`);
  }

  getById(id: number): Observable<ShelterDto> {
    return this.http
      .get<ShelterDto>(`${environment.api}/api/shelters/${id}`)
      .pipe(
        map(response =>
          plainToClass(ShelterDto, response, { groups: ['petman-client'] })
        )
      );
  }

  list(query: ListQueryRequestDto): Observable<ShelterListResponseDto> {
    return this.http
      .get<ShelterListResponseDto>(`${environment.api}/api/shelters`, {
        params: <any>query
      })
      .pipe(
        map(response =>
          plainToClass(ShelterListResponseDto, response, {
            groups: ['petman-client']
          })
        )
      );
  }
}
