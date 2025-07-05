import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {OAuthStorage, provideOAuthClient} from 'angular-oauth2-oidc';
import {environment} from '../environments/environment';
import {NgxSpinnerModule} from 'ngx-spinner';
import {provideAnimations} from '@angular/platform-browser/animations';

export function storageFactory(): OAuthStorage {
  return localStorage
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideOAuthClient({resourceServer: {allowedUrls: [environment.apiUrl, "localhost"], sendAccessToken: true}}),
    {provide: OAuthStorage, useFactory: storageFactory},
    provideAnimations(),
    importProvidersFrom(NgxSpinnerModule.forRoot({type: 'ball-clip-rotate'}))
  ]
};
