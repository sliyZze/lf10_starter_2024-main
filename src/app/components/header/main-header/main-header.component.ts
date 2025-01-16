import { Component } from '@angular/core';
import {NavigationService} from "../../services/NavigationService";
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-main-header',
  imports: [
    NgIf,
  ],
  templateUrl: './main-header.component.html',
  standalone: true,
  styleUrl: './main-header.component.css'
})
export class MainHeaderComponent {
  isModalVisible = false;
  isHeaderVisible = true;

  constructor(private navigationService: NavigationService) {
  }

  onLogoutClick() {
    this.isModalVisible = true;
  }

  onConfirmLogout() {
    this.isModalVisible = false;
    this.navigationService.redirectToLogin();
  }

  onCloseModal() {
    this.isModalVisible = false;
  }
}
