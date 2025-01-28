import {APP_INITIALIZER, ApplicationConfig, inject, provideAppInitializer} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {KeycloakAngularModule, KeycloakBearerInterceptor, KeycloakService} from "keycloak-angular";
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


export function initializeKeycloak(keycloak: KeycloakService): () => Promise<boolean> {
  return () =>
    keycloak.init({
      config: {
        url: 'https://keycloak.szut.dev/auth',
        realm: 'szut',
        clientId: 'employee-management-service-frontend',
      },
      initOptions: {
        onLoad: 'login-required', // Alternative: 'check-sso' für Single Sign-On
        checkLoginIframe: false,
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      },
      enableBearerInterceptor: true,
      //bearerExcludedUrls: ['/assets', '/public'],
    });
}



function initializeApp(keycloak: KeycloakService): () => Promise<boolean> {
  return () => initializeKeycloak(keycloak)();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    KeycloakAngularModule,
    provideAppInitializer(() => {
      const initializerFn = (initializeApp)(inject(KeycloakService));
      return initializerFn();
    }),
    KeycloakService,
    //{
    //  provide: APP_INITIALIZER,
    //  useFactory: initializeKeycloak,
    //  multi: true,
    //  deps: [KeycloakService]
    //},
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakBearerInterceptor,
      multi: true
    }, provideAnimationsAsync()
  ]
};
