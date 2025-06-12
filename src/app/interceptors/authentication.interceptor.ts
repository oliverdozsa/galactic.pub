import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getIdToken();

  if (token) {
    console.log("intercepting")
    const newReq = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${token}`),
    });
    return next(newReq);
  }

  return next(req);
};
