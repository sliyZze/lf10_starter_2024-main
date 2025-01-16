import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { EmployeeTableComponent } from "../employee/employee-table/employee-table.component";

@Component({
  selector: 'app-main-view-component',
  imports: [
    RouterOutlet, EmployeeTableComponent
  ],
  templateUrl: './main-view-component.html',
  standalone: true,
  styleUrl: './main-view-component.css'
})
export class MainViewComponent {

}
