import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private keycloakService: KeycloakService) {}

  async canActivate(): Promise<boolean> {
    const isLoggedIn = await this.keycloakService.isLoggedIn();

    if (!isLoggedIn) {
      this.keycloakService.login();
      return false;
    }
    return true;
  }
}
