import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

import { ListQueryRequestDto, WalkerDto, WalkerListResponseDto, WalkerRequestDto } from '@petman/common';

import { environment } from '@environments/environment';
import { WalkerModule } from '@walker/walker.module';

@Injectable({
  providedIn: WalkerModule
})
export class WalkerService {

  constructor(@Inject(PLATFORM_ID) protected platformId: Object, private http: HttpClient) {
  }

  create(body: WalkerRequestDto): Observable<WalkerDto> {
    return this.http.post<WalkerDto>(`${environment.api}/api/walkers`, body).pipe(
      map(response => plainToClass(WalkerDto, response, { groups: ['petman-client'] }))
    );
  }

  update(id, body: WalkerRequestDto): Observable<WalkerDto> {
    return this.http.put<WalkerDto>(`${environment.api}/api/walkers/${id}`, body).pipe(
      map(response => plainToClass(WalkerDto, response, { groups: ['petman-client'] }))
    );
  }

  delete(id: number): Observable<Object> {
    return this.http.delete(`${environment.api}/api/walkers/${id}`);
  }

  getById(id: number): Observable<WalkerDto> {
    return this.http
      .get<WalkerDto>(`${environment.api}/api/walkers/${id}`).pipe(
        map(response => plainToClass(WalkerDto, response, { groups: ['petman-client'] }))
      );
  }

  list(query: ListQueryRequestDto): Observable<WalkerListResponseDto> {
    return this.http
      .get<WalkerListResponseDto>(`${environment.api}/api/walkers`, { params: <any>query }).pipe(
        map(response => plainToClass(WalkerListResponseDto, response, { groups: ['petman-client'] }))
      );
  }
}
