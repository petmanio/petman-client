import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '@shared/shared.module';

import { reducers } from '@lost-found/reducers';
import { LostFoundRoutingModule } from '@lost-found/lost-found-routing.module';
import { LostFoundService } from '@lost-found/lost-found.service';
import { LostFoundEffects } from '@lost-found/effects/lost-found.effects';
import { LostFoundExistsGuard } from '@lost-found/lost-found-exists.guard';
import { LostFoundOwnerGuard } from '@lost-found/lost-found-owner.guard';
import { LostFoundListPageComponent } from '@lost-found/pages/lost-found-list-page/lost-found-list-page.component';
import { LostFoundCreatePageComponent } from '@lost-found/pages/lost-found-create-page/lost-found-create-page.component';
import { LostFoundDetailsPageComponent } from '@lost-found/pages/lost-found-details-page/lost-found-details-page.component';
import { LostFoundUpdatePageComponent } from '@lost-found/pages/lost-found-update-page/lost-found-update-page.component';

@NgModule({
  imports: [
    CommonModule,
    LostFoundRoutingModule,
    StoreModule.forFeature('lost-found', reducers),
    EffectsModule.forFeature([LostFoundEffects]),

    SharedModule
  ],
  declarations: [
    LostFoundListPageComponent,
    LostFoundCreatePageComponent,
    LostFoundDetailsPageComponent,
    LostFoundUpdatePageComponent
  ],
  providers: [LostFoundService, LostFoundExistsGuard, LostFoundOwnerGuard]
})
export class LostFoundModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LostFoundModule,
      providers: []
    };
  }
}
