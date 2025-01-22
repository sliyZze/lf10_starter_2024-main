import {Component, ViewChild} from '@angular/core';
import {EmployeeDataModalComponent} from "../../modal/employee-data-modal/employee-data-modal.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {CreateEmployeeService} from "../../services/CreateEmployeeService";
import {AddQualificationService} from "../../services/AddQualificationService";
import {QualificationComponent} from "../../qualification/qualification/qualification.component";
import {DataService} from "../../../service/data.service";
import {Employee} from "../../../model/Employee";
import {async, Observable} from "rxjs";

@Component({
  selector: 'app-create-employee',
  standalone: true,
    imports: [
        EmployeeDataModalComponent,
        FormsModule,
        NgForOf,
        ReactiveFormsModule,
        QualificationComponent,
        AsyncPipe,
        NgIf
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
    }

    closeModal() {
        this.modal.closeModal();
        this.createEmployeeService.setValue(false);
    }

    onAddQualificatoinClick (){
        this.addQualificationService.setValue(true)
    }

    employee: Employee = {
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
