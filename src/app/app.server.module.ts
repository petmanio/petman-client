import { NgModule } from '@angular/core';
import {
  ServerModule,
  ServerTransferStateModule
} from '@angular/platform-server';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import { AppStorage } from '@storage/universal.inject';
import { UniversalStorage } from '@storage/server.storage';
import { TranslateServerModule } from '@translate/translate-server/translate-server.module';
import { AppModule } from '@app/app.module';
import { AppComponent } from '@app/app.component';
import { AppShellComponent } from '@app/app-shell/app-shell.component';

// const routes: Routes = [ { path: 'app-shell-path', component: AppShellComponent }];

@NgModule({
  imports: [
    AppModule,
    NoopAnimationsModule,
    ServerTransferStateModule,
    ServerModule,
    ModuleMapLoaderModule,
    TranslateServerModule
    // RouterModule.forRoot(routes),
  ],
  providers: [{ provide: AppStorage, useClass: UniversalStorage }],
  declarations: [AppShellComponent],
  bootstrap: [AppComponent]
})
export class AppServerModule {}
