import { Component, OnInit } from '@angular/core';
import {NavigationService} from "../../services/NavigationService";

@Component({
  selector: 'app-main-header',
  imports: [
  ],
  standalone: true,
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent {

  constructor(private navigationService: NavigationService) {}

  onLogoutClick() {
    this.navigationService.redirectToLogin()
  }
}
