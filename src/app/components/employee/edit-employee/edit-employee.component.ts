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
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {DataService} from "../../../service/data.service";
import {Observable, Subscription} from "rxjs";
import {Employee} from "../../../model/Employee";
import {AddQualificationService} from "../../services/AddQualificationService";
import {AddEmployee} from "../../../model/AddEmployee";

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [FormsModule, EmployeeDataModalComponent, NgForOf, NgIf, AsyncPipe],
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent  implements OnChanges, OnDestroy{

  @ViewChild(EmployeeDataModalComponent) modal!: EmployeeDataModalComponent;
  title: string = "Mitarbeiter bearbeiten";
  qualificationToRemove: number | null = null;
  @ViewChild('deleteQualificationModal', {static: true}) deleteQualificationModal!: TemplateRef<any>;
  protected modalRef!: NgbModalRef;
  employee$!: Observable<Employee>;
  @Input() employeeId?: number;
  employee: Employee | null = null; // Lokale Kopie

  private subscriptions: Subscription = new Subscription();
  private qid: number | undefined;
  private eid: number | undefined;

  constructor(protected editEmployeeService: EditEmployeeService, private modalService: NgbModal, private dataService: DataService,  private addQualificationService: AddQualificationService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employeeId'] && changes['employeeId'].currentValue) {
      this.loadEmployee();
    }
  }

  private loadEmployee(): void {
    if (this.employeeId !== undefined) {
      this.employee$ = this.dataService.getEmployee(this.employeeId);
      this.employee$.subscribe((employee: Employee) => {
        this.employee = { ...employee };
      });
    }
  }

  onSaveChanges() {
    this.employee$.subscribe((employee: Employee) => {

      // @ts-ignore
      this.employeeAdd.id = this.employee.id
      // @ts-ignore
      this.employeeAdd.firstName = this.employee.firstName;
      // @ts-ignore
      this.employeeAdd.lastName = this.employee.lastName;
      // @ts-ignore
      this.employeeAdd.city = this.employee.city;
      // @ts-ignore
      this.employeeAdd.phone = this.employee.phone;
      // @ts-ignore
      this.employeeAdd.postcode = this.employee.postcode;
      // @ts-ignore
      this.employeeAdd.street = this.employee.street;
      // @ts-ignore
      this.employeeAdd.skillSet = this.employee.skillSet.map(skill =>
        typeof skill === "object" && skill.id !== undefined ? skill.id : skill
      ).filter(id => typeof id === "number");

      console.log(this.employee);

      this.dataService.updateEmployee(this.employeeAdd).subscribe(response => {
        console.log('Update erfolgreich:', response);
      });
    });
    this.modal.closeModal();
    this.editEmployeeService.setValue(false);
  }

  employeeAdd: AddEmployee = {
    lastName: "",
    firstName: "",
    street: "",
    postcode: "",
    city: "",
    phone: "",
    skillSet: []
  };

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  closeModal() {
    this.modal.closeModal();
    this.editEmployeeService.setValue(false);
  }

  onAddQualificationClick (){
    this.addQualificationService.setValue(true)
    this.addQualificationService.setEmployee(this.employeeAdd)
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
        this.modalRef.close();
      },
      error: (err) => console.error('Fehler beim Löschen:', err),
    });
  }

}
