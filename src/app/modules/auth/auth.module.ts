import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    CommonModule,
    AuthRoutingModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects]),

    SharedModule,
    MaterialModule
  ],
  declarations: [
    LoginFormComponent,
    LoginFormSocialComponent,
    LoginPageComponent
  ],
  providers: [AuthGuard, DenyAuthGuard],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [],
    };
  }
}

