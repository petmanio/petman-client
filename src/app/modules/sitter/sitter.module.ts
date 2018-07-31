import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '@shared/shared.module';

import { reducers } from '@sitter/reducers';
import { SitterRoutingModule } from '@sitter/sitter-routing.module';
import { SitterService } from '@sitter/sitter.service';
import { SitterEffects } from '@sitter/effects/sitter.effects';
import { SitterExistsGuard } from '@sitter/sitter-exists.guard';
import { SitterOwnerGuard } from '@sitter/sitter-owner.guard';
import { SitterCanCreateGuard } from '@sitter/sitter-can-create.guard';
import { SitterListPageComponent } from '@sitter/pages/sitter-list-page/sitter-list-page.component';
import { SitterCreatePageComponent } from '@sitter/pages/sitter-create-page/sitter-create-page.component';
import { SitterDetailsPageComponent } from '@sitter/pages/sitter-details-page/sitter-details-page.component';
import { SitterUpdatePageComponent } from '@sitter/pages/sitter-update-page/sitter-update-page.component';

@NgModule({
  imports: [
    CommonModule,
    SitterRoutingModule,
    StoreModule.forFeature('sitter', reducers),
    EffectsModule.forFeature([SitterEffects]),

    SharedModule
  ],
  declarations: [
    SitterListPageComponent,
    SitterCreatePageComponent,
    SitterDetailsPageComponent,
    SitterUpdatePageComponent
  ],
  providers: [
    SitterService,
    SitterExistsGuard,
    SitterOwnerGuard,
    SitterCanCreateGuard
  ]
})
export class SitterModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SitterModule,
      providers: []
    };
  }
}
