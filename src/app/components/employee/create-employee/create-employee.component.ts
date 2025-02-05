import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {EmployeeDataModalComponent} from "../../modal/employee-data-modal/employee-data-modal.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CreateEmployeeService} from "../../services/CreateEmployeeService";
import {AddQualificationService} from "../../services/AddQualificationService";
import {QualificationComponent} from "../../qualification/qualificationModal/qualificationModal.component";
import {DataService} from "../../../service/data.service";
import {AddEmployee} from "../../../model/AddEmployee";
import {CreateQualificationComponent} from "../../qualification/craete-qualification/create-qualification.component";
import {NgForOf} from "@angular/common";
import {CreateQualificationService} from "../../services/CreateQualificationService";
import {Skill} from "../../../model/Skill";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [
    EmployeeDataModalComponent,
    FormsModule,
    ReactiveFormsModule,
    QualificationComponent,
    CreateQualificationComponent,
    NgForOf
  ],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent implements OnInit{
    title: string = "Mitarbeiter Erstellen";
    qualifications: Skill[] = [];
    modalRef!: NgbModalRef;
    @ViewChild('deleteQualificationModal', { static: true }) deleteQualificationModal!: TemplateRef<any>;
    private qid?: number;

  constructor(protected createEmployeeService: CreateEmployeeService, private addQualificationService: AddQualificationService, private dataService: DataService, private  createQualificationService: CreateQualificationService,     private modalService: NgbModal) {
    }

  ngOnInit(): void {
    this.createQualificationService.savedQualifications$.subscribe((qualifications) => {
      console.log("Empfangene Qualifikationen:", qualifications);
      this.qualifications = qualifications;
    });
  }


  onSaveChanges() {
    this.dataService.addEmployee(this.employee).subscribe({
      next: () => {
        this.dataService.loadEmployees();
        this.employee = {
          lastName: "",
          firstName: "",
          street: "",
          postcode: "",
          city: "",
          phone: "",
          skillSet: []
        };
      },
      error: (err) => console.error('Fehler beim Hinzufügen des Mitarbeiters:', err),
    });
    this.createEmployeeService.setValue(false);
  }

  closeModal() {
        this.createEmployeeService.setValue(false);
    }

    onCreateQualificationClick (){
      this.addQualificationService.setValue(true)
      this.addQualificationService.setEmployee(this.employee)

    }

    employee: AddEmployee = {
        lastName: "",
        firstName: "",
        street: "",
        postcode: "",
        city: "",
        phone: "",
        skillSet: []
    };

  openDeleteModal(): void {
    this.modalRef = this.modalService.open(this.deleteQualificationModal, { ariaLabelledBy: 'deleteModalLabel' });
  }

  setQualificationToRemove(qId: number | undefined) {
    this.qid = qId;
    this.openDeleteModal();
  }

  confirmDeleteQualification() {
    if (this.qid === undefined) return;

    // this.dataService.deleteQualification(this.qid).subscribe({
    //   next: () => {
    //     this.qualifications = this.qualifications.filter(q => q.id !== this.qid);
    //     this.modalRef.close();
    //   },
    //   error: err => console.error('Fehler beim Löschen:', err)
    // });
  }

}
