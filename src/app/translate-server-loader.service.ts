import { readFileSync } from 'fs';
import { join } from 'path';
import { makeStateKey, StateKey, TransferState } from '@angular/platform-browser';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';

export class TranslateServerLoader implements TranslateLoader {
  constructor(
    private prefix: string = 'i18n',
    private suffix: string = '.json',
    private transferState: TransferState
  ) {
  }

  public getTranslation(lang: string): Observable<Object> {

    return Observable.create(observer => {
      const assetsFolder = join(process.cwd(), 'dist', 'petman-client', this.prefix);

      const jsonData = JSON.parse(readFileSync(`${assetsFolder}/${lang}${this.suffix}`, 'utf8'));

      // Here we save the translations in the transfer-state
      const key: StateKey<number> = makeStateKey<number>('transfer-translate-' + lang);
      this.transferState.set(key, jsonData);

      observer.next(jsonData);
      observer.complete();
    });
  }
}
