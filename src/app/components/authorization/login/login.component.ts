import {Component, ViewEncapsulation} from '@angular/core';
import {NavigationService} from '../../employee/services/navigation.service';

@Component({
  selector: 'app-login',
  imports: [],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation: ViewEncapsulation.None,
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
