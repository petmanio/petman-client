import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { TranslateServerLoader } from '@app/translate-server-loader.service';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { AppShellComponent } from './app-shell/app-shell.component';
import { TransferState } from '@angular/platform-browser';

export function translateServerFactory(transferState: TransferState) {
  return new TranslateServerLoader('/assets/i18n', '.json', transferState);
}
// const routes: Routes = [ { path: 'app-shell-path', component: AppShellComponent }];

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateServerFactory,
        deps: [TransferState]
      }
    }),

    // RouterModule.forRoot(routes),
    AppModule,
    ServerModule,

    ServerTransferStateModule,
    ModuleMapLoaderModule
  ],
  bootstrap: [AppComponent],
  declarations: [AppShellComponent]
})
export class AppServerModule {}
