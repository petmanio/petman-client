import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '@shared/shared.module';

import { reducers } from '@user/reducers';
import { UserRoutingModule } from '@user/user-routing.module';
import { UserService } from '@user/user.service';
import { UserEffects } from '@user/effects/user.effects';
import { UserExistsGuard } from '@user/user-exists.guard';
import { UserOwnerGuard } from '@user/user-owner.guard';
import { UserDetailsPageComponent } from '@user/pages/user-details-page/user-details-page.component';
import { UserUpdatePageComponent } from '@user/pages/user-update-page/user-update-page.component';

@NgModule({
  imports: [
    StoreModule.forFeature('user', reducers),
    EffectsModule.forFeature([UserEffects])
  ],
  declarations: [UserDetailsPageComponent, UserUpdatePageComponent],
  providers: [UserService, UserExistsGuard, UserOwnerGuard]
})
export class UserRootModule {}

@NgModule({
  imports: [SharedModule, UserRootModule, UserRoutingModule]
})
export class UserModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UserRootModule,
      providers: []
    };
  }
}
