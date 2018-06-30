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
import { ListPageComponent } from '@shelter/pages/list-page/list-page.component';
import { AddPageComponent } from '@shelter/pages/add-page/add-page.component';
import { DetailsPageComponent } from '@shelter/pages/details-page/details-page.component';
import { EditPageComponent } from '@shelter/pages/edit-page/edit-page.component';

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
    ListPageComponent,
    AddPageComponent,
    DetailsPageComponent,
    EditPageComponent,
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

