import {Component, ViewEncapsulation} from '@angular/core';
import {NavigationService} from '../../employee/services/navigation.service';

@Component({
    selector: 'app-reset-password',
    imports: [],
    templateUrl: './reset-password.component.html',
    styleUrl: './reset-password.component.css',
    encapsulation: ViewEncapsulation.None
})
export class ResetPasswordComponent {
  constructor(private navigationService: NavigationService) {
  }

  onBackClick(){
    this.navigationService.redirectToLogin();
  }
}
