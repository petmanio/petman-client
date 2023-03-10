import * as moment from 'moment';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { TranslateService as NGXTranslateService } from '@ngx-translate/core';
import { MetaService } from '@ngx-meta/core';
import { Observable, of } from 'rxjs';
import { ILang } from '@translate/translate.interface';
import { CookiesService } from '@ngx-utils/cookies';

// TODO: load from configuration
export const LANG_LIST: ILang[] = [
  { code: 'hy', name: 'Հայերեն', culture: 'hy-Am' },
  { code: 'en', name: 'English', culture: 'en-US' }
];
const LANG_DEFAULT: ILang = LANG_LIST[0];
const STORAGE_LANG_NAME = 'langCode';

@Injectable()
export class TranslateService {
  constructor(
    private cookies: CookiesService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: any,
    @Inject(REQUEST) private request: Request,
    @Inject(NGXTranslateService) private translate: NGXTranslateService,
    @Inject(MetaService) private meta: MetaService
  ) {
  }

  initLanguage(): Promise<any> {
    return new Promise((resolve: Function) => {
      this.translate.addLangs(LANG_LIST.map((lang: ILang) => lang.code));
      this.translate.setDefaultLang(LANG_DEFAULT.code);
      const language: ILang = this.getLanguage();
      this.setLanguage(language);
      resolve();
    });
  }

  changeLang(code: string) {
    const lang: ILang = this.getFindLang(code);
    if (!lang || lang.code === this.translate.currentLang) {
      return;
    }
    // FIXME: cookieService default expires date not working on produciton build
    this.cookies.put(STORAGE_LANG_NAME, lang.code, {
      expires: moment(new Date())
        .add(1, 'year')
        .toDate()
    });
    this.setLanguage({ code: lang.code } as ILang);
  }

  getLangList(): Observable<ILang[]> {
    return of(LANG_LIST);
  }

  getCurrentLang(): string {
    return this.translate.currentLang;
  }

  private getFindLang(code: string): ILang | null {
    return code ? LANG_LIST.find((lang: ILang) => lang.code === code) : null;
  }

  private setLanguage(lang: ILang): void {
    this.translate.use(lang.code).subscribe(() => {
      this.meta.setTag('og:locale', lang.culture);
      this.document.documentElement.lang = lang.code;
    });
  }

  private getLanguage(): ILang {
    let language: ILang = this.getFindLang(this.cookies.get(STORAGE_LANG_NAME));
    if (language) {
      return language;
    }
    if (isPlatformBrowser(this.platformId)) {
      language = this.getFindLang(this.translate.getBrowserLang());
    }
    if (isPlatformServer(this.platformId)) {
      try {
        const reqLangList: string[] = this.request.headers['accept-language'].split(';')[0].split(',');
        language = LANG_LIST.find(
          (lang: ILang) => reqLangList.indexOf(lang.code) !== -1 || reqLangList.indexOf(lang.culture) !== -1
        );
      } catch (err) {
        language = LANG_DEFAULT;
      }
    }
    language = language || LANG_DEFAULT;
    // FIXME: cookieService default expires date not working on produciton build
    this.cookies.put(STORAGE_LANG_NAME, language.code, {
      expires: moment(new Date())
        .add(1, 'year')
        .toDate()
    });
    return language;
  }
}
