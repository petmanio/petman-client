import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { forEach } from 'lodash';

import { ListQueryRequestDto, ShelterCreateRequestDto, ShelterDto, ShelterListResponseDto } from '@petman/common';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShelterService {

  constructor(@Inject(PLATFORM_ID) protected platformId: Object, private http: HttpClient) {
  }

  create(body: ShelterCreateRequestDto): Observable<ShelterDto> {
    let formData: FormData;
    if (isPlatformBrowser(this.platformId)) {
      formData = new FormData();
      formData.append('description', body.description);
      formData.append('price', (body.price || '').toString());

      if (body.images instanceof FileList) {
        forEach(body.images, file => formData.append('images', file, file.name));
      } else if (body.images instanceof File) {
        formData.append('images', body.images, body.images.name);
      }
    }
    return this.http.post<ShelterDto>(`${environment.api}/api/shelters`, formData).pipe(
      map(response => plainToClass(ShelterDto, response, { groups: ['petman-client'] }))
    );
  }

  update(body: ShelterDto): Observable<ShelterDto> {
    let formData: FormData;
    if (isPlatformBrowser(this.platformId)) {
      formData = new FormData();
      formData.append('description', body.description);
      formData.append('price', (body.price || '').toString());
      forEach(body.images, (file: any) => {
        if (typeof file === 'string') {
          formData.append('images', file);
        } else {
          formData.append('images', file, file.name);
        }
      });
    }
    return this.http.put<ShelterDto>(`${environment.api}/api/shelters/${body.id}`, formData).pipe(
      map(response => plainToClass(ShelterDto, response, { groups: ['petman-client'] }))
    );
  }

  delete(id: number): Observable<Object> {
    return this.http.delete(`${environment.api}/api/shelters/${id}`);
  }

  getById(id: number): Observable<ShelterDto> {
    return this.http
      .get<ShelterDto>(`${environment.api}/api/shelters/${id}`).pipe(
        map(response => plainToClass(ShelterDto, response, { groups: ['petman-client'] }))
      );
  }

  list(query: ListQueryRequestDto): Observable<ShelterListResponseDto> {
    return this.http
      .get<ShelterListResponseDto>(`${environment.api}/api/shelters`, { params: <any>query }).pipe(
        map(response => plainToClass(ShelterListResponseDto, response, { groups: ['petman-client'] }))
      );
  }
}
