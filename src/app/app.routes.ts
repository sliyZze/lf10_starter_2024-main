import { Routes } from '@angular/router';
import {EmployeeTableComponent} from './components/employee/employee-table/employee-table.component';
import {LoginComponent} from './components/authorization/login/login.component';
import {ResetPasswordComponent} from './components/authorization/reset-password/reset-password.component';
import {QualificationPageComponent} from "./components/qualification/qualification-page/qualification-page.component";
import {AuthGuard} from "./auth.guard";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivate: [AuthGuard], // Keycloak schützt nur diese Routen
    children: [
      { path: 'employees', component: EmployeeTableComponent },
      { path: 'resetPassword', component: ResetPasswordComponent },
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      {path: "qualification", component: QualificationPageComponent},
      { path: '**', redirectTo: '/login' },
    ]
  }
];
