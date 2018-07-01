import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

import { ListQueryRequestDto, OrganizationCreateRequestDto, OrganizationDto, OrganizationListResponseDto } from '@petman/common';

import { environment } from '@environments/environment';
import { OrganizationModule } from '@organization/organization.module';

@Injectable({
  providedIn: OrganizationModule
})
export class OrganizationService {

  constructor(@Inject(PLATFORM_ID) protected platformId: Object, private http: HttpClient) {
  }

  create(body: OrganizationCreateRequestDto): Observable<OrganizationDto> {
    let formData: FormData;
    if (isPlatformBrowser(this.platformId)) {
      formData = new FormData();
    }
    return this.http.post<OrganizationDto>(`${environment.api}/api/organizations`, formData).pipe(
      map(response => plainToClass(OrganizationDto, response, { groups: ['petman-client'] }))
    );
  }

  update(body: OrganizationDto): Observable<OrganizationDto> {
    let formData: FormData;
    if (isPlatformBrowser(this.platformId)) {
      formData = new FormData();
    }
    return this.http.put<OrganizationDto>(`${environment.api}/api/organizations/${body.id}`, formData).pipe(
      map(response => plainToClass(OrganizationDto, response, { groups: ['petman-client'] }))
    );
  }

  delete(id: number): Observable<Object> {
    return this.http.delete(`${environment.api}/api/organizations/${id}`);
  }

  getById(id: number): Observable<OrganizationDto> {
    return this.http
      .get<OrganizationDto>(`${environment.api}/api/organizations/${id}`).pipe(
        map(response => plainToClass(OrganizationDto, response, { groups: ['petman-client'] }))
      );
  }

  list(query: ListQueryRequestDto): Observable<OrganizationListResponseDto> {
    return this.http
      .get<OrganizationListResponseDto>(`${environment.api}/api/organizations`, { params: <any>query }).pipe(
        map(response => plainToClass(OrganizationListResponseDto, response, { groups: ['petman-client'] }))
      );
  }
}
