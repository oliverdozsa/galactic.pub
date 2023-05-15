import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, switchMap} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "@auth0/auth0-angular";
import {TokenAuthService} from "../services/token-auth.service";

@Injectable()
export class JwtBearerInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private tokenAuth: TokenAuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.tokenAuth.isAuthenticated) {
      return this.addTokenAuthJwtIfNeeded(req, next)
    } else {
      return this.addAuth0JwtIfNeeded(req, next);
    }
  }

  private addTokenAuthJwtIfNeeded(request: HttpRequest<any>, next: HttpHandler) {
    if(this.shouldRequestBeAuthenticatedBasedOnUrl(request)) {
      const token = this.tokenAuth.token!.token;
      const newHeaders = request.headers.set("Authorization", "Bearer " + token);
      const requestWithJwt = request.clone<any>({headers: newHeaders});
      return next.handle(requestWithJwt)
    }

    return next.handle(request);
  }

  private addAuth0JwtIfNeeded(request: HttpRequest<any>, next: HttpHandler) {
    const addJwt = this.auth.idTokenClaims$
      .pipe(switchMap(t => {
        const newHeaders = request.headers.set("Authorization", "Bearer " + t?.__raw);
        const requestWithJwt = request.clone<any>({headers: newHeaders});
        return next.handle(requestWithJwt);
      }));

    return this.auth.isAuthenticated$
      .pipe(switchMap(isAuth => {
        if (isAuth && this.shouldRequestBeAuthenticatedBasedOnUrl(request)) {
          return addJwt;
        }

        return next.handle(request);
      }));
  }

  private shouldRequestBeAuthenticatedBasedOnUrl(request: HttpRequest<any>) {
    return !request.url.includes("castvote/createTransaction") && !request.url.includes("encryptchoice");
  }
}
