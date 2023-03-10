import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '@shared/shared.module';

import { reducers } from '@walker/reducers';
import { WalkerRoutingModule } from '@walker/walker-routing.module';
import { WalkerService } from '@walker/walker.service';
import { WalkerEffects } from '@walker/effects/walker.effects';
import { WalkerExistsGuard } from '@walker/walker-exists.guard';
import { WalkerOwnerGuard } from '@walker/walker-owner.guard';
import { WalkerCanCreateGuard } from '@walker/walker-can-create.guard';
import { WalkerListPageComponent } from '@walker/pages/walker-list-page/walker-list-page.component';
import { WalkerCreatePageComponent } from '@walker/pages/walker-create-page/walker-create-page.component';
import { WalkerDetailsPageComponent } from '@walker/pages/walker-details-page/walker-details-page.component';
import { WalkerUpdatePageComponent } from '@walker/pages/walker-update-page/walker-update-page.component';

@NgModule({
  imports: [
    CommonModule,
    WalkerRoutingModule,
    StoreModule.forFeature('walker', reducers),
    EffectsModule.forFeature([WalkerEffects]),

    SharedModule
  ],
  declarations: [
    WalkerListPageComponent,
    WalkerCreatePageComponent,
    WalkerDetailsPageComponent,
    WalkerUpdatePageComponent
  ],
  providers: [
    WalkerService,
    WalkerExistsGuard,
    WalkerOwnerGuard,
    WalkerCanCreateGuard
  ]
})
export class WalkerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: WalkerModule,
      providers: []
    };
  }
}
