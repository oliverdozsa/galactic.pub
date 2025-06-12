import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {OAuthStorage} from 'angular-oauth2-oidc';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(OAuthStorage);
  const token = authService.getItem("access_token");

  if (token && req.url.includes("localhost:8080")) {
    console.log("intercepting")
    const newReq = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${token}`),
    });
    return next(newReq);
  }

  return next(req);
};
