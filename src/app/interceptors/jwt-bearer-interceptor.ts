import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, switchMap} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "@auth0/auth0-angular";

@Injectable()
export class JwtBearerInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let reqToUse = req;

    const addJwt = this.auth.idTokenClaims$
      .pipe(switchMap(t => {
        const newHeaders = req.headers.set("Authorization", "Bearer " + t?.__raw);
        reqToUse = req.clone<any>({headers: newHeaders});
        return next.handle(reqToUse);
      }));

    return this.auth.isAuthenticated$
      .pipe(switchMap(isAuth => {
        if (isAuth && this.shouldRequestBeAuthenticatedBasedOnUrl(req)) {
          return addJwt;
        }

        return next.handle(req);
      }));
  }

  private shouldRequestBeAuthenticatedBasedOnUrl(request: HttpRequest<any>) {
    return !request.url.includes("castvote/createTransaction") && !request.url.includes("encryptchoice");
  }
}
