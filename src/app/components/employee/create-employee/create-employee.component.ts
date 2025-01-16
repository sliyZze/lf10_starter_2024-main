import {Component, ViewChild} from '@angular/core';
import {EmployeeDataModalComponent} from "../../modal/employee-data-modal/employee-data-modal.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {CreateEmployeeService} from "../../services/CreateEmployeeService";

@Component({
  selector: 'app-create-employee',
  standalone: true,
    imports: [
        EmployeeDataModalComponent,
        FormsModule,
        NgForOf,
        ReactiveFormsModule
    ],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent {
    @ViewChild(EmployeeDataModalComponent) modal!: EmployeeDataModalComponent;
    title: string = "Mitarbeiter Erstellen";
    protected modalRef!: NgbModalRef;

    constructor(protected createEmployeeService: CreateEmployeeService) {
    }

    onSaveChanges() {
        this.modal.closeModal();
        this.createEmployeeService.setValue(false);
    }

    closeModal() {
        this.modal.closeModal();
        this.createEmployeeService.setValue(false);
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
