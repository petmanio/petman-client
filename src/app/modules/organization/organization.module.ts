import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@material/material.module';

import { reducers } from '@organization/reducers';
import { OrganizationRoutingModule } from '@organization/organization-routing.module';
import { OrganizationService } from '@organization/organization.service';
import { OrganizationEffects } from '@organization/effects/organization.effects';
import { OrganizationExistsGuard } from '@organization/organization-exists.guard';
import { OrganizationOwnerGuard } from '@organization/organization-owner.guard';

@NgModule({
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    StoreModule.forFeature('organization', reducers),
    EffectsModule.forFeature([OrganizationEffects]),

    SharedModule,
    MaterialModule
  ],
  declarations: [
  ],
  providers: [OrganizationService, OrganizationExistsGuard, OrganizationOwnerGuard],
})
export class OrganizationModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: OrganizationModule,
      providers: [],
    };
  }
}

