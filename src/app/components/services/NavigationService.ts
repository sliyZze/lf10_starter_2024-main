import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private _router: Router) {}

  redirectToEmployeeTable(): void {
    this._router.navigate(['/employees']);
  }

  redirectToLogin(): void {
    this._router.navigate(['/login']);
  }

  redirectResetPassword(): void {
    this._router.navigate(['/resetPassword']);
  }

  redirectQualificationPage(): void {
    this._router.navigate(['/qualification']);
  }

}
