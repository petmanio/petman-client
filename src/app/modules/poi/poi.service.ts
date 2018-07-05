import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { isArray } from 'lodash';

import {
  CategoryListResponseDto,
  ListQueryRequestDto,
  PinDto,
  PoiCreateRequestDto,
  PoiDto,
  PoiListQueryRequestDto,
  PoiListResponseDto,
  PoiPinsQueryRequestDto
} from '@petman/common';

import { environment } from '@environments/environment';
import { PoiModule } from '@poi/poi.module';

@Injectable({
  providedIn: PoiModule
})
export class PoiService {

  constructor(@Inject(PLATFORM_ID) protected platformId: Object, private http: HttpClient) {
  }

  create(body: PoiCreateRequestDto): Observable<PoiDto> {
    let formData: FormData;
    if (isPlatformBrowser(this.platformId)) {
      formData = new FormData();
    }
    return this.http.post<PoiDto>(`${environment.api}/api/pois`, formData).pipe(
      map(response => plainToClass(PoiDto, response, { groups: ['petman-client'] }))
    );
  }

  update(body: PoiDto): Observable<PoiDto> {
    let formData: FormData;
    if (isPlatformBrowser(this.platformId)) {
      formData = new FormData();
    }
    return this.http.put<PoiDto>(`${environment.api}/api/pois/${body.id}`, formData).pipe(
      map(response => plainToClass(PoiDto, response, { groups: ['petman-client'] }))
    );
  }

  delete(id: number): Observable<Object> {
    return this.http.delete(`${environment.api}/api/pois/${id}`);
  }

  getById(id: number): Observable<PoiDto> {
    return this.http
      .get<PoiDto>(`${environment.api}/api/pois/${id}`).pipe(
        map(response => plainToClass(PoiDto, response, { groups: ['petman-client'] }))
      );
  }

  list(query: PoiListQueryRequestDto): Observable<PoiListResponseDto> {
    let params = new HttpParams()
      .set('offset', query.offset.toString())
      .set('limit', query.limit.toString());

    if (query.primaryCategories) {
      (isArray(query.primaryCategories) ? query.primaryCategories : [query.primaryCategories])
        .forEach(primaryCategory => params = params.append('primaryCategories', primaryCategory.toString()));
    }
    return this.http
      .get<PoiListResponseDto>(`${environment.api}/api/pois`, { params }).pipe(
        map(response => plainToClass(PoiListResponseDto, response, { groups: ['petman-client'] }))
      );
  }

  pins(query: PoiPinsQueryRequestDto): Observable<PinDto[]> {
    let params = new HttpParams()
      .set('offset', query.offset.toString())
      .set('limit', query.limit.toString());

    if (query.primaryCategories) {
      (isArray(query.primaryCategories) ? query.primaryCategories : [query.primaryCategories])
        .forEach(primaryCategory => params = params.append('primaryCategories', primaryCategory.toString()));
    }
    return this.http
      .get<PinDto[]>(`${environment.api}/api/pois/pins`, { params }).pipe(
        map(response => plainToClass(PinDto, response, { groups: ['petman-client'] }))
      );
  }

  categories(query: ListQueryRequestDto): Observable<CategoryListResponseDto> {
    return this.http
      .get<CategoryListResponseDto>(`${environment.api}/api/pois/categories`, {  params: <any>query  }).pipe(
        map(response => plainToClass(CategoryListResponseDto, response, { groups: ['petman-client'] }))
      );
  }
}
