import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, switchMap} from "rxjs";
import {Injectable} from "@angular/core";
import {AppAuthService} from "../services/app-auth.service";

@Injectable()
export class JwtBearerInterceptor implements HttpInterceptor {
  constructor(private appAuth: AppAuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.appAuth.isAuthenticated) {
      const newHeaders = request.headers.set("Authorization", "Bearer " + this.appAuth.jwt);
      const requestWithJwt = request.clone<any>({headers: newHeaders});
      return next.handle(requestWithJwt);
    }

    return next.handle(request);
  }
}
