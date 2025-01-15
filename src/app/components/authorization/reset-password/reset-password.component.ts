import {Component, ViewEncapsulation} from '@angular/core';
import {NavigationService} from '../../services/NavigationService';

@Component({
  selector: 'app-reset-password',
  imports: [],
  standalone: true,
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ResetPasswordComponent {
  constructor(private navigationService: NavigationService) {
  }

  onBackClick(){
    this.navigationService.redirectToLogin();
  }
}
