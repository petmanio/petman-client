import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

import { MapService } from '@map/map.service';

@Injectable()
export class MapEffects {
  constructor(private actions$: Actions, private mapService: MapService) {
  }
}
