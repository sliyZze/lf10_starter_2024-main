import { Component, OnInit } from '@angular/core';
import {NavigationService} from "../../services/NavigationService";
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-main-header',
  imports: [
  ],
  standalone: true,
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent {

  constructor(private navigationService: NavigationService, private keycloakService: KeycloakService) {}

  onLogoutClick() {
    this.navigationService.redirectToLogin()
  }
  logout(): void {
    this.keycloakService.logout('http://localhost:4200');
  }
}
