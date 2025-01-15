import { Component, OnInit } from '@angular/core';
import { AlertService } from "../../services/AlertService";
import {NgIf} from "@angular/common";
import {ModalComponent} from "../../modal/alert/alert.component";
import {NavigationService} from "../../services/NavigationService";

@Component({
  selector: 'app-main-header',
  imports: [
    NgIf,
    ModalComponent,
  ],
  standalone: true,
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {
  showAlert: boolean = false;

  constructor(private alertService: AlertService, private navigationService: NavigationService) {}

  ngOnInit(): void {
    this.alertService.getValue().subscribe((value: boolean) => {
      this.showAlert = value;
    });
  }

  onLogoutClick() {
    this.alertService.setValue(true);
  }

  onConfirmLogout() {
    this.alertService.setValue(false);
    this.navigationService.redirectToLogin()


  }
  onCloseModal() {
    this.alertService.setValue(false);
  }
}
