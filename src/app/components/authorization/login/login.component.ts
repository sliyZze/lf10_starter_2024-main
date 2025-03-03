import {Component, ViewEncapsulation} from '@angular/core';
import {NavigationService} from '../../services/NavigationService';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  constructor(private navigationService: NavigationService) {}

  onLogin(){
    this.navigationService.redirectToEmployeeTable();
  }
  onPasswordReset(){
    this.navigationService.redirectResetPassword();
  }
}
