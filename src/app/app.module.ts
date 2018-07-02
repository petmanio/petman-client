import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { ShareButtonsModule } from '@ngx-share/buttons';

import { environment } from '@environments/environment';
import { MaterialModule } from '@material/material.module';
import { SharedModule } from '@shared/shared.module';
import { UtilService } from '@shared/services/util/util.service';
import { CoreModule } from '@core/core.module';
import { AuthModule } from '@auth/auth.module';
import { OrganizationModule } from '@organization/organization.module';

import { metaReducers, reducers } from '@app/reducers';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { AppEffects } from '@app/app.effects';
import { CustomHeadersInterceptor } from '@app/interseptors/custom-headers/custom-headers.interceptor';
import { NotFoundPageComponent } from '@app/pages/not-found-page/not-found-page.component';
import { HomePageComponent } from '@app/pages/home-page/home-page.component';

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
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects]),
    NgProgressModule.forRoot(),
    NgProgressHttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (UtilService.createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    ShareButtonsModule.forRoot(),

    SharedModule.forRoot(),
    MaterialModule.forRoot(),
    CoreModule.forRoot(),
    AuthModule.forRoot(),
    OrganizationModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CustomHeadersInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
