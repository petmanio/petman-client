import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MapModule } from '@map/map.module';

@Injectable({
  providedIn: MapModule
})
export class MapService {

  constructor(private http: HttpClient) {
  }
}
