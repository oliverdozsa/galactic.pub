import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {OAuthStorage, provideOAuthClient} from 'angular-oauth2-oidc';
import {environment} from '../environments/environment';

export function storageFactory(): OAuthStorage {
  return localStorage
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideOAuthClient({resourceServer: {allowedUrls: [environment.apiUrl, "localhost"], sendAccessToken: true}}),
    {provide: OAuthStorage, useFactory: storageFactory}
  ]
};
