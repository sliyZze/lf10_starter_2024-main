import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {MainViewComponent} from "./components/main-view-component/main-view-component";

@Component({
  selector: 'app-root',
  imports: [CommonModule, MainViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lf10StarterNew';
  constructor(private keycloakService: KeycloakService) {}

  logout(): void {
    this.keycloakService.logout('http://localhost:4200');
  }
}
