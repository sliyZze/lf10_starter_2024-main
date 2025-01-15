import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { EmployeeTableComponent } from "../employee/employee-table/employee-table.component";

@Component({
    selector: 'app-main-view-component',
    imports: [
        RouterOutlet, EmployeeTableComponent
    ],
    templateUrl: './main-view-component.html',
    styleUrl: './main-view-component.css'
})
export class MainViewComponent {

}
