import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@material/material.module';

import { reducers } from '@user/reducers';
import { UserRoutingModule } from '@user/user-routing.module';
import { UserService } from '@user/user.service';
import { UserEffects } from '@user/effects/user.effects';

@NgModule({
  imports: [
    StoreModule.forFeature('user', reducers),
    EffectsModule.forFeature([UserEffects])
  ],
  providers: [UserService]
})
export class UserRootModule {}

@NgModule({
  imports: [SharedModule, MaterialModule, UserRootModule, UserRoutingModule]
})
export class UserModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UserRootModule,
      providers: []
    };
  }
}
