import {Component, ViewChild} from '@angular/core';
import {EmployeeDataModalComponent} from "../../modal/employee-data-modal/employee-data-modal.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CreateEmployeeService} from "../../services/CreateEmployeeService";
import {AddQualificationService} from "../../services/AddQualificationService";
import {QualificationComponent} from "../../qualification/qualificationModal/qualificationModal.component";
import {DataService} from "../../../service/data.service";
import {async} from "rxjs";
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
    CreateQualificationComponent,
  ],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent {
    @ViewChild(EmployeeDataModalComponent) modal!: EmployeeDataModalComponent;
    title: string = "Mitarbeiter Erstellen";
    // employee!: Employee;

    constructor(protected createEmployeeService: CreateEmployeeService, private addQualificationService: AddQualificationService, private dataService: DataService) {
    }

    onSaveChanges() {
        this.dataService.addEmployee(this.employee).subscribe({
            next: () => {
                console.log("Mitarbeiter erfolgreich hinzugefügt");
            },
            error: (err) => {
                console.error("Fehler:", err);
            }
        });
        this.modal.closeModal();
        this.createEmployeeService.setValue(false);
        // this.employee = new AddEmployee();
    }

    closeModal() {
        this.modal.closeModal();
        this.createEmployeeService.setValue(false);
        // this.employee = new AddEmployee();
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

    protected readonly async = async;
}
