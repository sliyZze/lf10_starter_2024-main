import {Component, OnInit, ViewChild} from '@angular/core';
import {EmployeeDataModalComponent} from "../../modal/employee-data-modal/employee-data-modal.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CreateEmployeeService} from "../../services/CreateEmployeeService";
import {AddQualificationService} from "../../services/AddQualificationService";
import {QualificationComponent} from "../../qualification/qualificationModal/qualificationModal.component";
import {DataService} from "../../../service/data.service";
import {AddEmployee} from "../../../model/AddEmployee";
import {CreateQualificationComponent} from "../../qualification/craete-qualification/create-qualification.component";

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [
    EmployeeDataModalComponent,
    FormsModule,
    ReactiveFormsModule,
    QualificationComponent,
    CreateQualificationComponent
  ],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent{
    title: string = "Mitarbeiter Erstellen";

    constructor(protected createEmployeeService: CreateEmployeeService, private addQualificationService: AddQualificationService, private dataService: DataService) {
    }

  onSaveChanges() {
    this.dataService.addEmployee(this.employee).subscribe({
      next: () => {
        this.dataService.loadEmployees();
      },
      error: (err) => console.error('Fehler beim Hinzufügen des Mitarbeiters:', err),
    });
    this.createEmployeeService.setValue(false);
  }

  closeModal() {
        this.createEmployeeService.setValue(false);
    }

    onCreateQualificationClick (){
      this.addQualificationService.setValue(true)
      this.addQualificationService.setEmployee(this.employee)

    }

    employee: AddEmployee = {
        lastName: "",
        firstName: "",
        street: "",
        postcode: "",
        city: "",
        phone: "",
        skillSet: []
    };


}
