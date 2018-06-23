import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from './reducers/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './effects/auth.effects';
import * as fromLoginPage from './reducers/login-page.reducer';
import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    StoreModule.forFeature('auth', fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects]),
    StoreModule.forFeature('auth.loginPage', fromLoginPage.reducer)
  ],
  declarations: [LoginPageComponent]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [],
    };
  }
}

