import {Injectable} from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import {TokenAuthService} from "./token-auth.service";
import {AuthenticationState} from "../data/authentication-state";
import {Subject, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppAuthService {
  jwt: string | undefined;
  isTokenAuthAuthenticated = false;

  authState: AuthenticationState = AuthenticationState.UNAUTHENTICATED;
  authState$ = new Subject<AuthenticationState>();

  private isAuth0Authenticated = false;

  get isAuthenticated() {
    return this.jwt != undefined;
  }

  constructor(private auth0: AuthService, private tokenAuth: TokenAuthService) {
    this.authState = AuthenticationState.CHECKING;
    this.authState$.next(this.authState);

    this.authState$.next(this.authState);
    tokenAuth.jwt$
      .subscribe({
        next: t => this.onTokenAuthJwtReceived(t)
      });

    auth0.idTokenClaims$
      .subscribe({
        next: t => this.onAuth0JwtReceived(t?.__raw)
      });
  }

  loginThroughAuth0() {
    this.authState = AuthenticationState.CHECKING;
    this.auth0.loginWithPopup();
  }

  loginThroughToken(token: string) {
    this.authState = AuthenticationState.CHECKING;
    this.tokenAuth.loginWith(token);
  }

  logout() {
    if (this.tokenAuth.isActive) {
      this.tokenAuth.logout();
    } else {
      this.auth0.logout({logoutParams: {returnTo: document.location.origin}});
    }
  }

  private onAuth0JwtReceived(jwt: string | undefined) {
    this.isAuth0Authenticated = jwt != undefined;

    if (!this.tokenAuth.isActive) {
      this.onJwtReceived(jwt)
    } else if(jwt != undefined) {
      this.auth0.logout({openUrl: false});
    }
  }

  private onTokenAuthJwtReceived(jwt: string | undefined) {
    if (!this.tokenAuth.isActive) {
      return;
    }

    if (this.isAuth0Authenticated) {
      this.auth0.logout(); // This will redirect & reload the page
    } else {
      this.isTokenAuthAuthenticated = jwt != undefined;
      this.onJwtReceived(jwt);
    }
  }

  private onJwtReceived(jwt: string | undefined) {
    this.jwt = jwt;
    this.authState = this.jwt == undefined ? AuthenticationState.UNAUTHENTICATED : AuthenticationState.AUTHENTICATED;
    this.authState$.next(this.authState);
  }
}
