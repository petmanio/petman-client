import values from 'lodash-es/values';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import {
  MetaLoader,
  MetaStaticLoader,
  PageTitlePositioning
} from '@ngx-meta/core';

import { Language } from '@petman/common';

import { environment } from '@environments/environment';
import { LocalStorageService } from '@shared/services/local-storage/local-storage.service';

@Injectable()
export class UtilService {
  constructor(
    private translateService: TranslateService,
    private localStorageService: LocalStorageService,
    @Inject(PLATFORM_ID) protected platformId: Object
  ) {}

  /**
   * @deprecated moved to MetaModule
   */
  static metaFactory(translateService: TranslateService): MetaLoader {
    // TODO: load translation before meta
    return new MetaStaticLoader({
      callback: (key: string) => translateService.get(key),
      pageTitlePositioning: PageTitlePositioning.PrependPageTitle,
      pageTitleSeparator: ' - ',
      applicationName: 'APP_NAME',
      defaults: {
        title: 'DEFAULT_TITLE',
        description: 'DEFAULT_DESCRIPTION',
        'og:title': 'DEFAULT_TITLE',
        'og:description': 'DEFAULT_DESCRIPTION',
        'og:url': 'https://petman.io',
        'og:image': environment.origin + '/assets/icons/icon-72x72.png',
        'og:type': 'website',
        'og:locale': 'en_US',
        'og:locale:alternate': 'en_US,hy_AM',

        'fb:app_id': environment.fb.appId
      }
    });
  }

  static randomHtmlId(len: number = 5): string {
    let text = '';
    const possible = '_ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    for (let i = 0; i < len; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  static getRouteDataByKey(activatedRoute, key: string): any {
    // TODO: Find better way to get data from activated route
    return (
      activatedRoute.snapshot.data[key] ||
      (activatedRoute.snapshot.children.length &&
        activatedRoute.snapshot.children[0].data[key]) ||
      (activatedRoute.snapshot.children[0].children.length &&
        activatedRoute.snapshot.children[0].children[0].data[key])
    );
  }

  static getBrowserLanguageToEnumKey(lang: string): string {
    if (!lang) {
      return null;
    }
    return lang.toLocaleUpperCase();
  }

  static stripHtml(html: string): string {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }

  static getImageHeight(src: string): Promise<number> {
    return new Promise<number>(resolve => {
      const img = new Image();
      img.src = src;

      img.onload = () => resolve(img.height);
    });
  }

  static keyvaluePipeComparator(): number {
    return 0;
  }

  /**
   * @deprecated moved to TranslateModule
   */
  initLanguage(): Promise<void> {
    return new Promise((resolve: Function) => {
      let languageKey;

      if (isPlatformBrowser(this.platformId)) {
        languageKey = UtilService.getBrowserLanguageToEnumKey(
          this.localStorageService.getItem('language')
        );
        // TODO: get browser language or from geo this.translateService.getBrowserLang()
      }

      if (!languageKey || !Language[languageKey]) {
        languageKey = 'HY';
      }

      const language = Language[languageKey];

      this.localStorageService.setItem('language', language);

      this.translateService.addLangs(values(Language));
      this.translateService.setDefaultLang(Language.EN);

      this.translateService.use(language).subscribe(() => {
        // TODO: this.metaService.setTag('og:locale', 'en-US');
        resolve();
      });
    });
  }

  externalScripts() {
    if (isPlatformBrowser(this.platformId)) {
      // TODO: use ngx-facebook
      (<any>window).fbAsyncInit = () => {
        FB.init({
          appId: environment.fb.appId,
          xfbml: true,
          version: 'v2.9'
        });
        // FB.AppEvents.logPageView();
        FB.getLoginStatus(response => {
          if (response.status === 'connected') {
          } else if (response.status === 'not_authorized') {
          } else {
          }
        });
      };

      (function(d, s, id) {
        //noinspection TsLint
        let js;
        const fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = '//connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
      })(document, 'script', 'facebook-jssdk');

      if (environment.gaId) {
        const currdate: any = new Date();
        const gaNewElem: any = {};
        const gaElems: any = {};

        (function(i: any, s, o, g, r, a, m) {
          i['GoogleAnalyticsObject'] = r;
          (i[r] =
            i[r] ||
            function() {
              (i[r].q = i[r].q || []).push(arguments);
            }),
            (i[r].l = 1 * currdate);
          (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
          a.async = 1;
          a.src = g;
          m.parentNode.insertBefore(a, m);
        })(
          window,
          document,
          'script',
          '//www.google-analytics.com/analytics.js',
          'ga',
          gaNewElem,
          gaElems
        );

        ga('create', environment.gaId, 'auto');
        ga('send', 'pageview');
      }
    }
  }

  registerNewIcons() {
    // this.matIconRegistry
    //   .addSvgIconInNamespace('app', 'pet_health', this.sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/stethoscope.svg'));
  }
}
