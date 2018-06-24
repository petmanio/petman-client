import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { ListQueryRequestDto, ServiceListResponseDto } from '@petman/common';
import { environment } from '@environments/environment';

export interface ISharedService {
  serviceList(query: ListQueryRequestDto): Observable<ServiceListResponseDto>;
}

@Injectable()
export class SharedService implements ISharedService {
  constructor(@Inject(PLATFORM_ID) protected platformId: Object, private http: HttpClient) {
  }

  serviceList(query: ListQueryRequestDto): Observable<ServiceListResponseDto> {
    return this.http
      .get<ServiceListResponseDto>(`${environment.api}/api/services`, { params: <any>query }).pipe(
        map(response => plainToClass(ServiceListResponseDto, response, { groups: ['petman-client'] }))
      );
  }
}
