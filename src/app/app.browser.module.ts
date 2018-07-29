import {
  BrowserModule,
  BrowserTransferStateModule
} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { REQUEST } from '@nguniversal/express-engine/tokens';

import { environment } from '@environments/environment';
import { TranslateBrowserModule } from '@translate/translate-browser/translate-browser.module';
import { AppStorage } from '@storage/universal.inject';
import { CookieStorage } from '@storage/browser.storage';
import { AppModule } from '@app/app.module';
import { AppComponent } from '@app/app.component';

// the Request object only lives on the server
export function getRequest(): any {
  return { headers: { cookie: document.cookie } };
}

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'petman-universal' }),
    TransferHttpCacheModule,
    BrowserTransferStateModule,
    TranslateBrowserModule,
    AppModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  providers: [
    { provide: REQUEST, useFactory: getRequest },
    { provide: AppStorage, useClass: CookieStorage },
    { provide: 'ORIGIN_URL', useValue: location.origin }
  ],
  bootstrap: [AppComponent]
})
export class AppBrowserModule {}
