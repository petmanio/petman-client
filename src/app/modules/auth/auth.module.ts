import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@material/material.module';

import { reducers } from '@auth/reducers';
import { AuthRoutingModule } from '@auth/auth-routing.module';
import { AuthEffects } from '@auth/effects/auth.effects';
import { AuthGuard } from '@auth/auth.guard';
import { DenyAuthGuard } from '@auth/deny-auth.guard';
import { LoginPageComponent } from '@auth/login-page/login-page.component';
import { LoginFormComponent } from '@auth/components/login-form/login-form.component';
import { LoginFormSocialComponent } from '@auth/components/login-form-social/login-form-social.component';

@NgModule({
  imports: [
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects])
  ],
  providers: [AuthGuard, DenyAuthGuard]
})
export class AuthRootModule {}

@NgModule({
  imports: [SharedModule, MaterialModule, AuthRootModule, AuthRoutingModule],
  declarations: [
    LoginFormComponent,
    LoginFormSocialComponent,
    LoginPageComponent
  ]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthRootModule,
      providers: []
    };
  }
}
