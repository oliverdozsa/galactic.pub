import {inject, Injectable, signal} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private oauthService = inject(OAuthService);

  get isLoggedIn() {
    return this.oauthService.hasValidIdToken();
  }

  constructor() {
    this.oauthService.configure({
      issuer: "https://accounts.google.com",
      strictDiscoveryDocumentValidation: false,
      clientId: "192937802953-pts5ms5jq41gvfrud1i73q4enpnibup5.apps.googleusercontent.com",
      redirectUri: window.location.origin + "/home",
      scope: "openid profile email"
    })

    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
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
