import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
  BrowserModule,
  HAMMER_GESTURE_CONFIG
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { NgxMaskModule } from 'ngx-mask';

import { environment } from '@environments/environment';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { AuthModule } from '@auth/auth.module';
import { PoiModule } from '@poi/poi.module';
import { UserModule } from '@user/user.module';

import { TranslateService as AppTranslateService } from '@translate/translate.service';
import { AppHammerConfig } from '@app/app-hammer-config';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { AppEffects } from '@app/app.effects';
import { CustomHeadersInterceptor } from '@app/interseptors/custom-headers/custom-headers.interceptor';
import { metaReducers, reducers } from '@app/reducers';
import { NotFoundPageComponent } from '@app/pages/not-found-page/not-found-page.component';
import { HomePageComponent } from '@app/pages/home-page/home-page.component';
import { CookieService } from 'ngx-cookie-service';
import { MetaModule } from '@meta/meta.module';

export function initLanguage(translateService: AppTranslateService): Function {
  return (): Promise<any> => translateService.initLanguage();
}

@NgModule({
  declarations: [AppComponent, HomePageComponent, NotFoundPageComponent],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    BrowserModule.withServerTransition({ appId: 'petman-universal' }),
    TransferHttpCacheModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects]),
    NgProgressModule.forRoot(),
    NgProgressHttpModule,
    NgxMaskModule.forRoot(),
    ShareButtonsModule.forRoot(),

    MetaModule,
    SharedModule.forRoot(),
    CoreModule.forRoot(),
    AuthModule.forRoot(),
    PoiModule.forRoot(),
    UserModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHeadersInterceptor,
      multi: true
    },
    { provide: HAMMER_GESTURE_CONFIG, useClass: AppHammerConfig },
    { provide: APP_INITIALIZER, useFactory: initLanguage, multi: true, deps: [AppTranslateService] },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
