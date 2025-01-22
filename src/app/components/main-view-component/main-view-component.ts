import { Component } from '@angular/core';
import { EmployeeTableComponent } from "../employee/employee-table/employee-table.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-main-view-component',
  imports: [
    EmployeeTableComponent,
    RouterOutlet
  ],
  templateUrl: './main-view-component.html',
  standalone: true,
  styleUrl: './main-view-component.css'
})
export class MainViewComponent {

}
