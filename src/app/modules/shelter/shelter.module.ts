import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@material/material.module';

import { reducers } from '@shelter/reducers';
import { ShelterRoutingModule } from '@shelter/shelter-routing.module';
import { ShelterService } from '@shelter/shelter.service';
import { ShelterEffects } from '@shelter/effects/shelter.effects';
import { ShelterExistsGuard } from '@shelter/shelter-exists.guard';
import { ShelterOwnerGuard } from '@shelter/shelter-owner.guard';
import { ShelterListPageComponent } from '@shelter/pages/shelter-list-page/shelter-list-page.component';
import { ShelterCreatePageComponent } from '@shelter/pages/shelter-create-page/shelter-create-page.component';
import { ShelterDetailsPageComponent } from '@shelter/pages/shelter-details-page/shelter-details-page.component';
import { ShelterUpdatePageComponent } from '@shelter/pages/shelter-update-page/shelter-update-page.component';

@NgModule({
  imports: [
    CommonModule,
    ShelterRoutingModule,
    StoreModule.forFeature('shelter', reducers),
    EffectsModule.forFeature([ShelterEffects]),

    SharedModule,
    MaterialModule
  ],
  declarations: [
    ShelterListPageComponent,
    ShelterCreatePageComponent,
    ShelterDetailsPageComponent,
    ShelterUpdatePageComponent,
  ],
  providers: [ShelterService, ShelterExistsGuard, ShelterOwnerGuard],
})
export class ShelterModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ShelterModule,
      providers: [],
    };
  }
}

