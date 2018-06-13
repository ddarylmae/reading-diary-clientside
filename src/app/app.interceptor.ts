import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaderResponse, HttpProgressEvent,
  HttpResponse, HttpUserEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { TokenStorage } from './token.storage';
import 'rxjs/add/operator/do';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {

  constructor(private token: TokenStorage, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.token.isTokenExpired()) {
      req = req.clone({
        setHeaders: {
          authorization: this.token.getToken()
        }
      });
    }
    return next.handle(req).do(
      (err: any) => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
            this.router.navigate(['login']);
        }
      }
    );
  }
}
