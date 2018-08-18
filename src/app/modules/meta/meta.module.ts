import { NgModule } from '@angular/core';
import {
  MetaLoader,
  MetaModule as NgxMetaModule,
  MetaStaticLoader,
  PageTitlePositioning
} from '@ngx-meta/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { LANG_LIST } from '@translate/translate.service';

export function metaFactory(translate: TranslateService): MetaLoader {
  return new MetaStaticLoader({
    callback: (key: string): Observable<string | Object> => translate.get(key),
    pageTitlePositioning: PageTitlePositioning.PrependPageTitle,
    pageTitleSeparator: ' | ',
    applicationName: 'APP_NAME',
    defaults: {
      title: 'DEFAULT_TITLE',
      description: 'DEFAULT_DESCRIPTION',
      'og:title': 'DEFAULT_TITLE',
      'og:description': 'DEFAULT_DESCRIPTION',
      'og:url': 'https://petman.io',
      'og:image': environment.origin + '/assets/main-cover.jpg',
      'og:site_name': 'Petman',
      'og:type': 'website',
      'og:locale': 'hy_AM',
      'og:locale:alternate': LANG_LIST.map(
        (lang: any) => lang.culture
      ).toString(),

      'fb:app_id': environment.fb.appId
    }
  });
}

@NgModule({
  imports: [
    NgxMetaModule.forRoot({
      provide: MetaLoader,
      useFactory: metaFactory,
      deps: [TranslateService]
    })
  ]
})
export class MetaModule {}
