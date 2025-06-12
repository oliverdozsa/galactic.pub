import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {OAuthStorage, provideOAuthClient} from 'angular-oauth2-oidc';
import {environment} from '../environments/environment';
import {authenticationInterceptor} from './interceptors/authentication.interceptor';

export function storageFactory(): OAuthStorage {
  return localStorage
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(withInterceptors([])),
    provideOAuthClient({resourceServer: {allowedUrls: [environment.apiUrl, "http://localhostq"], sendAccessToken: true}}),
    {provide: OAuthStorage, useFactory: storageFactory}
  ]
};
