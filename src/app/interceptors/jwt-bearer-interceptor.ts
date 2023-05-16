import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, switchMap} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "@auth0/auth0-angular";
import {TokenAuthService} from "../services/token-auth.service";
import {CheckAuthService} from "../services/check-auth.service";

@Injectable()
export class JwtBearerInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private tokenAuth: TokenAuthService, private checkAuth: CheckAuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.checkAuth.isAuthenticated$
      .pipe(switchMap(isAuth => {
        if(isAuth && this.shouldRequestBeAuthenticatedBasedOnUrl(request)) {
          return this.useAppropriateJwt(request, next);
        }

        return next.handle(request);
      }));
  }

  private shouldRequestBeAuthenticatedBasedOnUrl(request: HttpRequest<any>) {
    return !request.url.includes("castvote/createTransaction") && !request.url.includes("encryptchoice");
  }

  private useAppropriateJwt(request: HttpRequest<any>, next: HttpHandler) {
    const addJwtAuth0 = this.auth.idTokenClaims$
      .pipe(switchMap(t => {
        const newHeaders = request.headers.set("Authorization", "Bearer " + t?.__raw);
        const requestWithJwt = request.clone<any>({headers: newHeaders});
        return next.handle(requestWithJwt);
      }));

    const addJwtTokenAuth = this.tokenAuth.jwt$
      .pipe(switchMap(t => {
        const newHeaders = request.headers.set("Authorization", "Bearer " + t);
        const requestWithJwt = request.clone<any>({headers: newHeaders});
        return next.handle(requestWithJwt);
      }));

    if(this.tokenAuth.isActive) {
      return addJwtTokenAuth;
    } else {
      return addJwtAuth0;
    }
  }
}
