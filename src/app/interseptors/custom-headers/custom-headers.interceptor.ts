import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { CookiesService } from '@ngx-utils/cookies';


@Injectable()
export class CustomHeadersInterceptor implements HttpInterceptor {
  constructor(private cookies: CookiesService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let token = this.cookies.get('token') || '';
    if (token) {
      token = `bearer ${token}`;
    }

    req = req.clone({
      headers: req.headers
        .set('authorization', token)
        .set('authorization-selected-user', this.cookies.get('selectedUserId') || '')
    });
    return next.handle(req);
  }
}

