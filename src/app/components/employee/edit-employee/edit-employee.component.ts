import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeDataModalComponent } from "../../modal/employee-data-modal/employee-data-modal.component";
import { EditEmployeeService } from '../../services/EmployeeEditService';
import { AsyncPipe, NgForOf, NgIf } from "@angular/common";
import { DataService } from "../../../service/data.service";
import { Observable, Subscription } from "rxjs";
import { Employee } from "../../../model/Employee";
import { AddQualificationService } from "../../services/AddQualificationService";
import { AddEmployee } from "../../../model/AddEmployee";

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [FormsModule, EmployeeDataModalComponent, NgForOf, NgIf],
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnChanges, OnDestroy {
  @ViewChild(EmployeeDataModalComponent) modal!: EmployeeDataModalComponent;
  @ViewChild('deleteQualificationModal', { static: true }) deleteQualificationModal!: TemplateRef<any>;

  @Input() employeeId?: number;

  title: string = "Mitarbeiter bearbeiten";
  modalRef!: NgbModalRef;
  employee$!: Observable<Employee>;
  employee: Employee | null = null;
  qualificationToRemove: number | null = null;
  private subscriptions = new Subscription();
  private eid?: number;
  private qid?: number;

  employeeAdd: AddEmployee = {
    lastName: "",
    firstName: "",
    street: "",
    postcode: "",
    city: "",
    phone: "",
    skillSet: []
  };

  constructor(
    protected editEmployeeService: EditEmployeeService,
    private modalService: NgbModal,
    private dataService: DataService,
    private addQualificationService: AddQualificationService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employeeId']?.currentValue) {
      this.loadEmployee();
    }
  }

  private loadEmployee(): void {
    if (this.employeeId !== undefined) {
      this.employee$ = this.dataService.getEmployee(this.employeeId);
      this.subscriptions.add(
        this.employee$.subscribe(employee => {
          this.employee = { ...employee };
        })
      );
    }
  }

  onSaveChanges(): void {
    if (!this.employee) return;

    this.employeeAdd = {
      ...this.employeeAdd,
      id: this.employee.id,
      firstName: this.employee.firstName,
      lastName: this.employee.lastName,
      city: this.employee.city,
      phone: this.employee.phone,
      postcode: this.employee.postcode,
      street: this.employee.street,
      skillSet: [
        // @ts-ignore
        ...this.employeeAdd.skillSet,
        // @ts-ignore
        ...this.employee.skillSet
          .map(skill => (typeof skill === "object" && skill.id !== undefined ? skill.id : skill))
          .filter((id): id is number => typeof id === "number")
          // @ts-ignore
          .filter(id => !this.employeeAdd.skillSet.includes(id))
      ]
    };

    this.dataService.updateEmployee(this.employeeAdd).subscribe(() => {
      console.log('Update erfolgreich');
    });
    this.editEmployeeService.setValue(false);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  closeModal() {
    this.editEmployeeService.setValue(false);
  }

  onAddQualificationClick(): void {
    this.addQualificationService.setValue(true);
    this.addQualificationService.setEmployee(this.employeeAdd);
  }

  setQualificationToRemove(qid?: number, eid?: number): void {
    this.qid = qid;
    this.eid = eid;
    this.openDeleteModal();
  }

  openDeleteModal(): void {
    this.modalRef = this.modalService.open(this.deleteQualificationModal, { ariaLabelledBy: 'deleteModalLabel' });
  }

  confirmDelete(): void {
    if (this.eid === undefined || this.qid === undefined) return;

    this.dataService.deleteQualificationFromEmployee(this.eid, this.qid).subscribe({
      next: () => {
        this.loadEmployee();
        this.modalRef.close();
        },
      error: err => console.error('Fehler beim Löschen:', err)
    });

  }
}
