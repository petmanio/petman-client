import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { ListQueryDto, ServiceListDto } from '@petman/common';
import { environment } from '@environments/environment';

export interface ISharedService {
  serviceList(query: ListQueryDto): Observable<ServiceListDto>;
}

@Injectable()
export class SharedService implements ISharedService {
  constructor(@Inject(PLATFORM_ID) protected platformId: Object, private http: HttpClient) {
  }

  serviceList(query: ListQueryDto): Observable<ServiceListDto> {
    return this.http
      .get<ServiceListDto>(`${environment.api}/api/services`).pipe(
        map(response => plainToClass(ServiceListDto, response, { groups: ['petman-client'] }))
      );
  }
}
