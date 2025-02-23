import {inject, Injectable, signal} from '@angular/core';
import {OAuthService, OAuthSuccessEvent} from 'angular-oauth2-oidc';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authEvent = new Subject<void>()

  private oauthService = inject(OAuthService);

  get isLoggedIn() {
    return this.oauthService.hasValidIdToken();
  }

  constructor() {
    this.oauthService.setStorage(localStorage);

    this.oauthService.configure({
      issuer: "https://accounts.google.com",
      strictDiscoveryDocumentValidation: false,
      clientId: "192937802953-pts5ms5jq41gvfrud1i73q4enpnibup5.apps.googleusercontent.com",
      redirectUri: window.location.origin + "/home",
      scope: "openid profile email"
    });

    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();

    this.oauthService.events.subscribe({
      next: e => {
        if(e instanceof OAuthSuccessEvent) {
          this.authEvent.next();
        }
      }
    })
  }

  login() {
    this.oauthService.initImplicitFlow();
  }

  logout() {
    this.oauthService.revokeTokenAndLogout();
    this.oauthService.logOut();
  }

  getProfile() {
    return this.oauthService.getIdentityClaims();
  }

  getIdToken() {
    return this.oauthService.getIdToken();
  }
}
