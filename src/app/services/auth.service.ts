import {inject, Injectable} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private oauthService = inject(OAuthService);
  private router = inject(Router);

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
    this.oauthService.loadDiscoveryDocumentAndTryLogin()
      .then(() => this.onTryLoginComplete());
  }

  login() {
    this.oauthService.initImplicitFlow(this.router.url);
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

  private onTryLoginComplete() {
    let stateUrl = this.oauthService.state!;
    if (stateUrl) {
      if (!stateUrl.startsWith('/')) {
        stateUrl = decodeURIComponent(stateUrl);
      }

      setTimeout(() =>this.router.navigateByUrl(stateUrl));
    }
  }
}
