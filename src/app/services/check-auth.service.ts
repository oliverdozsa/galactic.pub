import { Injectable } from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import {TokenAuthService} from "./token-auth.service";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CheckAuthService {

  constructor(private auth0: AuthService, private tokenAuth: TokenAuthService) { }

  get isAuthenticated$(): Observable<boolean> {
    if(this.tokenAuth.isAuthenticated) {
      return of(this.tokenAuth.isAuthenticated);
    } else {
      return this.auth0.isAuthenticated$;
    }
  }
}
