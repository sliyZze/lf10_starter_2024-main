import {Component, ViewChild} from '@angular/core';
import {EmployeeDataModalComponent} from "../../modal/employee-data-modal/employee-data-modal.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CreateEmployeeService} from "../../services/CreateEmployeeService";
import {AddQualificationService} from "../../services/AddQualificationService";
import {QualificationComponent} from "../../qualification/qualification/qualification.component";
import {Employee} from "../../../model/Employee";
import {Observable} from "rxjs";
import {DataService} from "../../../service/data.service";

@Component({
  selector: 'app-create-employee',
  standalone: true,
    imports: [
        EmployeeDataModalComponent,
        FormsModule,
        ReactiveFormsModule,
        QualificationComponent
    ],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent {
  @ViewChild(EmployeeDataModalComponent) modal!: EmployeeDataModalComponent;
  title: string = "Mitarbeiter Erstellen";
  employee$!: Observable<Employee>;

  constructor(protected createEmployeeService: CreateEmployeeService, private addQualificationService: AddQualificationService, private dataService: DataService) {
  }

  onSaveChanges() {
    // this.dataService.addEmployee(this.employee).subscribe(response => {
    //   console.log('Employee successfully added', response);
    //   this.modal.closeModal();
    //   this.createEmployeeService.setValue(false);
    // }, error => {
    //   console.error('Error adding employee', error);
    // });
  }

  closeModal() {
    this.modal.closeModal();
    this.createEmployeeService.setValue(false);
  }

    onAddQualificatoinClick (){
    this.addQualificationService.setValue(true)
  }

  employee = {
    lastname: 'jfkl',
    firstName: 'hisdf',
    street: 'Hamburger',
    postcode: '614 Hauser Street',
    city: '23534',
    phone: '01748377489 ',
    skillSet: 'Computer Science'
  };
}
