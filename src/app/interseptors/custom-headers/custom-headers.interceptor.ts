import { Inject, Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { AppStorage } from '@storage/universal.inject';


@Injectable()
export class CustomHeadersInterceptor implements HttpInterceptor {
  constructor(@Inject(AppStorage) private appStorage: Storage) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let token = this.appStorage.getItem('token') || '';
    if (token) {
      token = `bearer ${token}`;
    }

    req = req.clone({
      headers: req.headers
        .set('authorization', token)
        .set('authorization-selected-user', this.appStorage.getItem('selectedUserId') || '')
    });
    return next.handle(req);
  }
}

