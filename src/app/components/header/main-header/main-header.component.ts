import { Component } from '@angular/core';
import {NavigationService} from '../../employee/services/navigation.service';
import {ModalComponent} from '../../modal/alert/alert.component';
import {NgIf} from '@angular/common';

@Component({
    selector: 'app-main-header',
    imports: [
        ModalComponent,
        NgIf,
    ],
    templateUrl: './main-header.component.html',
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
