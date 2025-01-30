import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private keycloakService: KeycloakService, private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const isLoggedIn = await this.keycloakService.isLoggedIn();

    // Überprüfe die URL und lasse die ungeschützte Seite zu
    if (state.url === '/app-login') {
      return true;
    }

    // Wenn der Benutzer nicht eingeloggt ist, leite zur Login-Seite weiter
    if (!isLoggedIn) {
      this.keycloakService.login(
        {
          redirectUri: window.location.origin + '/employees',
        }
      );
      return false;
    }

    return true;
  }
}
