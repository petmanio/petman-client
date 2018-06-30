import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class LocalStorageService {

  constructor(@Inject(PLATFORM_ID) protected platformId: Object) {
  }

  setItem(key: string, value: any) {
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (err) {
        localStorage.setItem(key, value);
      }
    }
  }

  getItem(key: string): any {
    let result;
    if (isPlatformBrowser(this.platformId)) {
      result = localStorage.getItem(key);
      try {
        result = JSON.parse(result);
      } catch (err) {
      }
    }
    return result;
  }
}
