import forEach from 'lodash-es/forEach';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

import {
  ListQueryRequestDto,
  SitterDto,
  SitterListResponseDto,
  SitterRequestDto
} from '@petman/common';

import { environment } from '@environments/environment';
import { SitterModule } from '@sitter/sitter.module';

@Injectable({
  providedIn: SitterModule
})
export class SitterService {
  constructor(
    @Inject(PLATFORM_ID) protected platformId: Object,
    private http: HttpClient
  ) {}

  create(body: SitterRequestDto): Observable<SitterDto> {
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
      .post<SitterDto>(`${environment.api}/api/sitters`, formData)
      .pipe(
        map(response =>
          plainToClass(SitterDto, response, { groups: ['petman-client'] })
        )
      );
  }

  update(id, body: SitterRequestDto): Observable<SitterDto> {
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
      .put<SitterDto>(`${environment.api}/api/sitters/${id}`, formData)
      .pipe(
        map(response =>
          plainToClass(SitterDto, response, { groups: ['petman-client'] })
        )
      );
  }

  delete(id: number): Observable<Object> {
    return this.http.delete(`${environment.api}/api/sitters/${id}`);
  }

  getById(id: number): Observable<SitterDto> {
    return this.http
      .get<SitterDto>(`${environment.api}/api/sitters/${id}`)
      .pipe(
        map(response =>
          plainToClass(SitterDto, response, { groups: ['petman-client'] })
        )
      );
  }

  list(query: ListQueryRequestDto): Observable<SitterListResponseDto> {
    return this.http
      .get<SitterListResponseDto>(`${environment.api}/api/sitters`, {
        params: <any>query
      })
      .pipe(
        map(response =>
          plainToClass(SitterListResponseDto, response, {
            groups: ['petman-client']
          })
        )
      );
  }
}
