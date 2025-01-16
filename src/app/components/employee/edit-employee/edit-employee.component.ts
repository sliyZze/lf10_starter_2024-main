import {Component, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NavigationService} from "../../services/NavigationService";
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {EmployeeDataModalComponent} from "../../modal/employee-data-modal/employee-data-modal.component";
import {EditEmployeeService} from "../../services/EmployeeEditService";

@Component({
  selector: 'app-edit-employee',
  imports: [
    FormsModule,
    EmployeeDataModalComponent
  ],
  templateUrl: './edit-employee.component.html',
  standalone: true,
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent {

  @ViewChild(EmployeeDataModalComponent) modal!: EmployeeDataModalComponent ;

  title: string = "Mitarbeiter bearbeiten";
  private modalRef: NgbModalRef | undefined;

  constructor(private editEmployeeService: EditEmployeeService, private modalService: NgbModal) {

  }

  onSaveChanges() {
    this.modal.closeModal();
    this.editEmployeeService.setValue(false);
  }

  closeModal() {
    this.modal.closeModal();
    this.editEmployeeService.setValue(false);
  }

  employee = {
    lastname: 'Doe',
    surname: 'John',
    phonenumber: '123-456-7890',
    street: '123 Main Street',
    postcode: '12345',
    city: 'Sample City',
    qualifications: 'Bachelor of Science in Computer Science'
  };
}
