import { Injectable } from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import {TokenAuthService} from "./token-auth.service";
import {merge, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CheckAuthService {

  constructor(private auth0: AuthService, private tokenAuth: TokenAuthService) { }

  get isAuthenticated$(): Observable<boolean> {
    return merge(this.tokenAuth.isAuthenticated$, this.auth0.isAuthenticated$);
  }
}
