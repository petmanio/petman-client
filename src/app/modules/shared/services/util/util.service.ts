import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { environment } from '@environments/environment';

@Injectable()
export class UtilService {
  constructor(
    @Inject(PLATFORM_ID) protected platformId: Object
  ) {}

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
