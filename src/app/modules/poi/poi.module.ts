import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@material/material.module';

import { reducers } from '@poi/reducers';
import { PoiRoutingModule } from '@poi/poi-routing.module';
import { PoiService } from '@poi/poi.service';
import { PoiEffects } from '@poi/effects/poi.effects';
import { PoiExistsGuard } from '@poi/poi-exists.guard';
import { PoiOwnerGuard } from '@poi/poi-owner.guard';

@NgModule({
  imports: [
    StoreModule.forFeature('poi', reducers),
    EffectsModule.forFeature([PoiEffects]),
  ],
  providers: [PoiService, PoiExistsGuard, PoiOwnerGuard]
})
export class PoiRootModule {}

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    PoiModule,
    PoiRoutingModule
  ],
  declarations: []
})
export class PoiModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PoiRootModule,
      providers: [],
    };
  }
}

