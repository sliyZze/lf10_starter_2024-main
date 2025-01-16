import {Component} from '@angular/core';
import {MainHeaderComponent} from '../../header/main-header/main-header.component';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {EditEmployeeService} from "../../services/EmployeeEditService";
import {EditEmployeeComponent} from "../edit-employee/edit-employee.component";
import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-employee-table',
  imports: [
    MainHeaderComponent,
    NgIf,
    FormsModule,
    EditEmployeeComponent,
    NgForOf
  ],
  standalone: true,
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.css'
})
export class EmployeeTableComponent {
  page: string = '';
  isValid: boolean = true;
  private modalRaf: NgbModalRef | undefined;

  constructor(private editEmployeeService: EditEmployeeService) {
  }


  onEditEmployee(){
    this.editEmployeeService.setValue(true)
  }

  validatePageInput() {
    return this.isValid = !isNaN(Number(this.page)) && this.page.trim() !== '' || this.page.length == 0;
  }

  onAddClick (){

  }

  employees = [
    {
      id: 1,
      name: 'Mark',
      surname: 'Otto',
      address: 'Angularstraße 12',
      city: 'Berlin',
      postcode: '10115',
      phone: '030-1234567',
      qualifications: ['Ingenieur', 'Qualifikation2', 'Qualifikation3']
    },
    {
      id: 2,
      name: 'Jacob',
      surname: 'Thornton',
      address: 'Hauptstraße 5',
      city: 'Hamburg',
      postcode: '20095',
      phone: '040-9876543',
      qualifications: ['Softwareentwickler', 'Qualifikation2', 'Qualifikation3']
    },
    {
      id: 3,
      name: 'Sophie',
      surname: 'Meier',
      address: 'Ringstraße 8',
      city: 'München',
      postcode: '80331',
      phone: '089-7654321',
      qualifications: ['Architektin', 'Qualifikation2', 'Qualifikation3']
    }
  ];
}
