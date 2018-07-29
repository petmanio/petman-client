import { NgModule } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { TranslateService } from '@translate/translate.service';
import { TranslateServerLoaderService } from '@translate/translate-server/translate-server-loader.service';

export function translateFactory(
  transferState: TransferState
): TranslateServerLoaderService {
  return new TranslateServerLoaderService(
    '/assets/i18n',
    '.json',
    transferState
  );
}

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateFactory,
        deps: [TransferState]
      }
    })
  ],
  providers: [TranslateService]
})
export class TranslateServerModule {}
