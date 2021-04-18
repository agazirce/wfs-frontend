import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthTokenService} from '../me/auth-token.service';

@Injectable()
export class AuthentificationInterceptor implements HttpInterceptor{

  constructor(
    private authTokenService: AuthTokenService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authTokenService.getToken();
    if (token) {
      const reqWithToken = req.clone({
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`
        })
      });
      return next.handle(reqWithToken);
    }
    return next.handle(req);
  }
}
