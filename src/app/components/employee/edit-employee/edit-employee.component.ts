import {Component, OnDestroy, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeDataModalComponent } from "../../modal/employee-data-modal/employee-data-modal.component";
import { EditEmployeeService } from '../../services/EmployeeEditService';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {DataService} from "../../../service/data.service";
import {Observable, Subscription} from "rxjs";
import {Employee} from "../../../model/Employee";

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [FormsModule, EmployeeDataModalComponent, NgForOf, NgIf, AsyncPipe],
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent  {

  @ViewChild(EmployeeDataModalComponent) modal!: EmployeeDataModalComponent;
  title: string = "Mitarbeiter bearbeiten";
  qualificationToRemove: number | null = null;
  @ViewChild('deleteQualificationModal', {static: true}) deleteQualificationModal!: TemplateRef<any>;
  protected modalRef!: NgbModalRef;
  employee$!: Observable<Employee>;

  private subscriptions: Subscription = new Subscription();
  private qid: number | undefined;
  private eid: number | undefined;

  constructor(protected editEmployeeService: EditEmployeeService, private modalService: NgbModal, private dataService: DataService) {
  }

  ngOnInit() {
    const employeeId = this.editEmployeeService.getEmployeeId();
    if (employeeId !== undefined) {
      this.employee$ = this.dataService.getEmployee(employeeId);
      this.employee$.subscribe((employee: Employee) => {
        console.log(employee.skillSet)
      });
    }
  }

  // Wird durch Button-Click aufgerufen
  loadEmployee() {
    const employeeId = this.editEmployeeService.getEmployeeId();
    if (employeeId !== undefined) {
      this.employee$ = this.dataService.getEmployee(employeeId);
      this.employee$.subscribe((employee: Employee) => {
        console.log(employee.skillSet)
      });
    }
  }

  onSaveChanges() {
    this.employee$.subscribe((employee: Employee) => {
      this.dataService.updateEmployee(employee).subscribe(response => {
        console.log('Update erfolgreich:', response);
      });
    });
    this.modal.closeModal();
    this.editEmployeeService.setValue(false);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  closeModal() {
    this.modal.closeModal();
    this.editEmployeeService.setValue(false);
  }

  setQualificationToRemove(qid: number | undefined, eid: number | undefined) {
    this.eid = eid;
    this.qid = qid;
    this.openDeleteModal();
  }

  openDeleteModal() {
    this.modalRef = this.modalService.open(this.deleteQualificationModal, {ariaLabelledBy: 'deleteModalLabel'});
  }

  confirmDelete() {
    this.dataService.deleteQualificationFromEmployee(this.eid, this.qid).subscribe({
      next: () => {
        this.ngOnInit();
        this.modalRef.close();
      },
      error: (err) => console.error('Fehler beim Löschen:', err),
    });
  }
}
