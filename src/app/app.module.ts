import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule, TransferState } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { MetaLoader, MetaModule } from '@ngx-meta/core';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { NgxMaskModule } from 'ngx-mask';

import { environment } from '@environments/environment';
import { MaterialModule } from '@material/material.module';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { AuthModule } from '@auth/auth.module';
import { PoiModule } from '@poi/poi.module';
import { UserModule } from '@user/user.module';

import { UtilService } from '@shared/services/util/util.service';
import { TranslateBrowserLoader } from '@app/translate-browser-loader.service';
import { metaReducers, reducers } from '@app/reducers';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { AppEffects } from '@app/app.effects';
import { CustomHeadersInterceptor } from '@app/interseptors/custom-headers/custom-headers.interceptor';
import { NotFoundPageComponent } from '@app/pages/not-found-page/not-found-page.component';
import { HomePageComponent } from '@app/pages/home-page/home-page.component';

export function translateBrowserFactory(http: HttpClient, transferState: TransferState) {
  return new TranslateBrowserLoader('/assets/i18n/', '.json', transferState, http);
}

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NotFoundPageComponent
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    BrowserModule.withServerTransition({ appId: 'petman-universal' }),
    TransferHttpCacheModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects]),
    NgProgressModule.forRoot(),
    NgProgressHttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateBrowserFactory,
        deps: [HttpClient, TransferState]
      }
    }),
    MetaModule.forRoot({
      provide: MetaLoader,
      useFactory: (UtilService.metaFactory),
      deps: [TranslateService]
    }),
    NgxMaskModule.forRoot(),
    ShareButtonsModule.forRoot(),

    SharedModule.forRoot(),
    MaterialModule.forRoot(),
    CoreModule.forRoot(),
    AuthModule.forRoot(),
    PoiModule.forRoot(),
    UserModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CustomHeadersInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
