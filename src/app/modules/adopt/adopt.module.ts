import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@material/material.module';

import { reducers } from '@adopt/reducers';
import { AdoptRoutingModule } from '@adopt/adopt-routing.module';
import { AdoptService } from '@adopt/adopt.service';
import { AdoptEffects } from '@adopt/effects/adopt.effects';
import { AdoptExistsGuard } from '@adopt/adopt-exists.guard';
import { AdoptOwnerGuard } from '@adopt/adopt-owner.guard';
import { AdoptListPageComponent } from '@adopt/pages/adopt-list-page/adopt-list-page.component';
import { AdoptCreatePageComponent } from '@adopt/pages/adopt-create-page/adopt-create-page.component';
import { AdoptDetailsPageComponent } from '@adopt/pages/adopt-details-page/adopt-details-page.component';
import { AdoptUpdatePageComponent } from '@adopt/pages/adopt-update-page/adopt-update-page.component';

@NgModule({
  imports: [
    CommonModule,
    AdoptRoutingModule,
    StoreModule.forFeature('adopt', reducers),
    EffectsModule.forFeature([AdoptEffects]),

    SharedModule,
    MaterialModule
  ],
  declarations: [
    AdoptListPageComponent,
    AdoptCreatePageComponent,
    AdoptDetailsPageComponent,
    AdoptUpdatePageComponent,
  ],
  providers: [AdoptService, AdoptExistsGuard, AdoptOwnerGuard],
})
export class AdoptModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AdoptModule,
      providers: [],
    };
  }
}

