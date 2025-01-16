import {Component, Output, TemplateRef, ViewChild} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeDataModalComponent } from "../../modal/employee-data-modal/employee-data-modal.component";
import { EditEmployeeService } from '../../services/EmployeeEditService';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {DataService} from "../../../service/data.service";
import {async, Observable, Subscription} from "rxjs";
import {Employee} from "../../../model/Employee";

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [FormsModule, EmployeeDataModalComponent, NgForOf, NgIf, AsyncPipe],
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent {

  @ViewChild(EmployeeDataModalComponent) modal!: EmployeeDataModalComponent;
  title: string = "Mitarbeiter bearbeiten";
  qualificationToRemove: number | null = null;
  @ViewChild('deleteQualificationModal', { static: true }) deleteQualificationModal!: TemplateRef<any>;
  protected modalRef!: NgbModalRef;
  employee?: Employee;
  private sub: Subscription = new Subscription();

  constructor(private editEmployeeService: EditEmployeeService, private modalService: NgbModal, private dataService: DataService) {}

  ngOnInit() {
    if (this.editEmployeeService.getEmployeeId() !== undefined) {
      this.sub = this.dataService.getEmployee(this.editEmployeeService.getEmployeeId()).subscribe(data => {
        this.employee = data;
      });
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  onSaveChanges() {
    this.modal.closeModal();
    this.editEmployeeService.setValue(false);
  }

  closeModal() {
    this.modal.closeModal();
    this.editEmployeeService.setValue(false);
  }

  /*employee = {
    firstName: 'Doe',
    lastName: 'John',
    phone: '123-456-7890',
    street: '123 Main Street',
    postcode: '12345',
    city: 'Sample City',
    // qualifications: 'Bachelor of Science in Computer Science'
  };*/

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

  protected readonly async = async;
}
