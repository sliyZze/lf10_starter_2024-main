import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainHeaderComponent } from './components/header/main-header/main-header.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: MainHeaderComponent },
  {
    path: 'employee-management',
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
