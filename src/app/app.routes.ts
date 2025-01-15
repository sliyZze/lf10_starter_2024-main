import { Routes } from '@angular/router';
import {EditEmployeeComponent} from './components/employee/edit-employee/edit-employee.component';
import {EmployeeTableComponent} from './components/employee/employee-table/employee-table.component';
import {LoginComponent} from './components/authorization/login/login.component';
import {ResetPasswordComponent} from './components/authorization/reset-password/reset-password.component';

export const routes: Routes = [
  { path: 'employees', component: EmployeeTableComponent },
  { path: 'login', component: LoginComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
