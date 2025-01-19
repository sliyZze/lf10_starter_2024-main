import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeDataModalComponent } from "../../modal/employee-data-modal/employee-data-modal.component";
import { EditEmployeeService } from '../../services/EmployeeEditService';
import { NgForOf, NgIf } from "@angular/common";

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [FormsModule, EmployeeDataModalComponent, NgForOf, NgIf],
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent {

  @ViewChild(EmployeeDataModalComponent) modal!: EmployeeDataModalComponent;
  title: string = "Mitarbeiter bearbeiten";
  qualificationToRemove: number | null = null;
  @ViewChild('deleteQualificationModal', { static: true }) deleteQualificationModal!: TemplateRef<any>;
  protected modalRef!: NgbModalRef;

  constructor(protected editEmployeeService: EditEmployeeService, private modalService: NgbModal) {}

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
    { title: 'Java' },
    { title: 'C#' },
    { title: 'Docker' },
    { title: 'JavaScript' },
    { title: 'TypeScript' },
    { title: 'Angular' },
  ];

  setQualificationToRemove(index: number) {
    this.qualificationToRemove = index;
    this.openDeleteModal();
  }

  openDeleteModal() {
    this.modalRef = this.modalService.open(this.deleteQualificationModal, { ariaLabelledBy: 'deleteModalLabel' });
  }

  confirmDelete() {
    if (this.qualificationToRemove !== null) {
      this.qualifications.splice(this.qualificationToRemove, 1);
      this.qualificationToRemove = null;
    }
    this.modalRef.close();
  }

}
