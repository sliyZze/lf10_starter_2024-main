import {Component, ViewEncapsulation} from '@angular/core';
import {NavigationService} from '../../services/NavigationService';
import {AlertService} from "../../services/AlertService";

@Component({
  selector: 'app-login',
  imports: [],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  constructor(private navigationService: NavigationService, private alertService: AlertService) {}

  onLogin(){
    this.navigationService.redirectToEmployeeTable();
    this.alertService.setValue(false)
    console.log(this.alertService.getValue())
  }
  onPasswordReset(){
    this.navigationService.redirectResetPassword();
  }
}
