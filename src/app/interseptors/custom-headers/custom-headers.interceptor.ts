import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { LocalStorageService } from '@shared/services/local-storage/local-storage.service';

@Injectable()
export class CustomHeadersInterceptor implements HttpInterceptor {
  constructor(private localStorageService: LocalStorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let token = this.localStorageService.getItem('token') || '';
    if (token) {
      token = `bearer ${token}`;
    }

    req = req.clone({
      headers: req.headers
        .set('authorization', token)
        .set('authorization-selected-user', this.localStorageService.getItem('selectedUserId') || '')
    });
    return next.handle(req);
  }
}

