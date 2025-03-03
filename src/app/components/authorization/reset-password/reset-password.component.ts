import {Component, ViewEncapsulation} from '@angular/core';
import {NavigationService} from '../../services/NavigationService';

@Component({
  selector: 'app-reset-password',
  imports: [],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class ResetPasswordComponent {
  constructor(private navigationService: NavigationService) {
  }

  onBackClick(){
    this.navigationService.redirectToLogin();
  }
}
