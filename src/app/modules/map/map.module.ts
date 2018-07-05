import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@material/material.module';

import { reducers } from '@map/reducers';
import { MapRoutingModule } from '@map/map-routing.module';
import { MapService } from '@map/map.service';
import { MapEffects } from '@map/effects/map.effects';
import { MapPageComponent } from '@map/map-page/map-page.component';

@NgModule({
  imports: [
    CommonModule,
    MapRoutingModule,
    StoreModule.forFeature('map', reducers),
    EffectsModule.forFeature([MapEffects]),

    SharedModule,
    MaterialModule
  ],
  declarations: [MapPageComponent],
  providers: [MapService],
})
export class MapModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MapModule,
      providers: [],
    };
  }
}

