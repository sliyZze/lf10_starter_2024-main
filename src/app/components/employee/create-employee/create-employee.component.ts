import {Component, ViewChild} from '@angular/core';
import {EmployeeDataModalComponent} from "../../modal/employee-data-modal/employee-data-modal.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CreateEmployeeService} from "../../services/CreateEmployeeService";
import {AddQualificationService} from "../../services/AddQualificationService";
import {QualificationComponent} from "../../qualification/qualification/qualification.component";

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

    constructor(protected createEmployeeService: CreateEmployeeService, private addQualificationService: AddQualificationService) {
    }

    onSaveChanges() {
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

    employee = {
        lastname: 'bla',
        surname: 'hisdf',
        phonenumber: '123-567-7195',
        street: '614 Hauser Street',
        postcode: '23534',
        city: 'Bla bla ',
        qualifications: 'Computer Science'
    };

}
