import {Component, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NavigationService} from '../../services/NavigationService';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {EmployeeDataModalComponent} from "../../modal/employee-data-modal/employee-data-modal.component";
import {EditEmployeeService} from '../../services/EmployeeEditService';
import {NgForOf, NgIf} from "@angular/common";
import {AlertService} from "../../services/AlertService";
import {ModalComponent} from "../../modal/alert/alert.component";

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [
    FormsModule,
    EmployeeDataModalComponent,
    NgForOf,
    ModalComponent,
    NgIf
  ],
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent {

  @ViewChild(EmployeeDataModalComponent) modal!: EmployeeDataModalComponent ;
  title: string = "Mitarbeiter bearbeiten";
  private modalRef: NgbModalRef | undefined;

  constructor(private editEmployeeService: EditEmployeeService, private modalService: NgbModal, private alertService: AlertService) {

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

  qualifications = [
    { title: 'Java'},
    { title: 'C#'},
    { title: 'Docker'},
    { title: 'JavaScript'},
    { title: 'TypeScript'},
    { title: 'Angular'},
  ];

  removeQualification(index: number) {
    const userConfirmation: boolean = confirm("Möchten Sie die Qualifikation löschen?");

    if (userConfirmation) {
      this.qualifications.splice(index, 1);
    }

  }

}
