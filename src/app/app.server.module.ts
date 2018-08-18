import * as moment from 'moment';
import { NgModule } from '@angular/core';
import { ServerTransferStateModule } from '@angular/platform-server';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { ServerCookiesModule } from '@ngx-utils/cookies/server';

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
    ModuleMapLoaderModule,
    TranslateServerModule,
    ServerCookiesModule.forRoot({
      path: '/',
      expires: moment(new Date())
        .add(1, 'year')
        .toDate()
    })
    // RouterModule.forRoot(routes),
  ],
  providers: [],
  declarations: [AppShellComponent],
  bootstrap: [AppComponent]
})
export class AppServerModule {}
