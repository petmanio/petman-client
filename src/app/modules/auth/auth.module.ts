import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@material/material.module';

import * as fromAuth from '@auth/reducers/auth.reducer';
import * as fromLoginPage from '@auth/reducers/login-page.reducer';
import { AuthRoutingModule } from '@auth/auth-routing.module';
import { AuthEffects } from '@auth/effects/auth.effects';
import { AuthService } from '@auth/auth.service';
import { AuthGuard } from '@auth/auth.guard';
import { LoginPageComponent } from '@auth/login-page/login-page.component';
import { LoginFormComponent } from '@auth/components/login-form/login-form.component';
import { LoginFormSocialComponent } from '@auth/components/login-form-social/login-form-social.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    StoreModule.forFeature('auth', fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects]),
    StoreModule.forFeature('auth.loginPage', fromLoginPage.reducer),

    SharedModule,
    MaterialModule
  ],
  declarations: [
    LoginFormComponent,
    LoginFormSocialComponent,
    LoginPageComponent
  ],
  providers: [AuthService, AuthGuard],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [],
    };
  }
}

