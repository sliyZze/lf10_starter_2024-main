import {Component, TemplateRef, ViewChild} from '@angular/core';
import {EmployeeDataModalComponent} from "../../modal/employee-data-modal/employee-data-modal.component";
import {FormsModule} from "@angular/forms";
import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {CreateEmployeeService} from "../../services/CreateEmployeeService";

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [
    EmployeeDataModalComponent,
    FormsModule
  ],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent {

  @ViewChild(EmployeeDataModalComponent) modal!: EmployeeDataModalComponent;
  protected modalRef!: NgbModalRef;

  constructor(private createEmployeeService: CreateEmployeeService) {}

  onSaveChanges() {
    this.modal.closeModal();
    this.createEmployeeService.setValue(false)
  }

  closeModal() {
    this.modal.closeModal();
    this.createEmployeeService.setValue(false)
  }

  employee = {
    lastname: 'Doe',
    surname: 'John',
    phonenumber: '123-456-7890',
    street: '123 Main Street',
    postcode: '12345',
    city: 'Sample City',
    qualifications: 'Bachelor of Science in Computer Science'
  }
}
