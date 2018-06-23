import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface ILocalStorageService {
  setItem(key: string, value: any): void;

  getItem(key: string): any;
}

@Injectable()
export class LocalStorageService implements ILocalStorageService {

  constructor(@Inject(PLATFORM_ID) protected platformId: Object) {
  }

  setItem(key: string, value: any): void {
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
