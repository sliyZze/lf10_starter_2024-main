import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {EmployeeDataModalComponent} from "../../modal/employee-data-modal/employee-data-modal.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AsyncPipe, NgForOf} from "@angular/common";
import {AddQualificationService} from "../../services/AddQualificationService";
import {DataService} from "../../../service/data.service";
import {async, Observable, Subscription} from "rxjs";
import {Skill} from "../../../model/Skill";
import {CreateQualificationService} from "../../services/CreateQualificationService";
import { BehaviorSubject } from 'rxjs';
import {AddEmployee} from "../../../model/AddEmployee";

@Component({
  selector: 'app-qualification-modal',
  standalone: true,
  imports: [
    EmployeeDataModalComponent,
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    AsyncPipe
  ],
  templateUrl: './qualificationModal.component.html',
  styleUrl: './qualificationModal.component.css'
})
export class QualificationComponent implements OnInit{
  @ViewChild(EmployeeDataModalComponent) modal!: EmployeeDataModalComponent;
  title: string = "Qualifikationen";
  qualifications?: Observable<Skill[]>;
  private filteredQualificationsSubject: BehaviorSubject<Skill[]> = new BehaviorSubject<Skill[]>([]);
  filteredQualifications: Observable<Skill[]> = this.filteredQualificationsSubject.asObservable(); // Um filteredQualifications als Observable zu haben
  @Input() createdQualification: string = ""
  private qualificationIdsList: number[] = [];
  searchtext: string = "";

  @Output() qualificationAdded = new EventEmitter<void>();

  constructor(
    protected addQualificationService: AddQualificationService,
    private dataService: DataService,
    private createQualificationService: CreateQualificationService
  ) {}

  ngOnInit() {
    this.loadQualifications()
  }

  // Wird durch Button-Click aufgerufen
  loadQualifications(): void {
    this.qualifications = this.dataService.getQualifications();
    this.qualifications?.subscribe(qualifications => {
      this.filteredQualificationsSubject.next([...qualifications]);
    });
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

  onSaveChanges() {
    this.modal.closeModal();

    let employeeId = this.addQualificationService.getEmployee().id;

    this.dataService.getEmployee(employeeId).subscribe(emp => {
      if (!emp) {
        console.error("Fehler: Mitarbeiter nicht gefunden.");
        return;
      }
      console.log(emp)
      // Neuen Employee mit bestehenden und neuen Qualifikationen erstellen

      let updatedEmployee = new AddEmployee(
        emp.id,
        emp.lastName,
        emp.firstName,
        emp.street,
        emp.postcode,
        emp.city,
        emp.phone,
        (emp.skillSet ?? []) // Falls `skillSet` undefined ist, wird ein leeres Array verwendet.
          .map(skill => skill.id)
          .filter((id): id is number => id !== undefined) // Entfernt `undefined`
      );

      if (!updatedEmployee.skillSet) {
        updatedEmployee.skillSet = [];
      }

      // Falls qualificationIdsList existiert, neue IDs hinzufügen
      if (this.qualificationIdsList && this.qualificationIdsList.length > 0) {
        updatedEmployee.skillSet = [...new Set([...updatedEmployee.skillSet, ...this.qualificationIdsList])];
      }

      // API-Aufruf zur Aktualisierung des Mitarbeiters
      this.dataService.updateEmployee(updatedEmployee).subscribe({
        next: () => {
          this.qualificationAdded.emit();
          this.qualificationIdsList = [];
        },
        error: (err) => {
          console.error('Fehler beim Aktualisieren:', err);
        },
      });
    });

    this.addQualificationService.setValue(false);
    console.log("Neue Skill-Set Liste:", this.qualificationIdsList);
  }


  closeModal() {
    this.modal.closeModal();
    this.addQualificationService.setValue(false);
  }

  getQualification(id: number | undefined) {
    if (id !== undefined) {
      this.qualificationIdsList?.push(id)
      console.log(this.qualificationIdsList);
      // @ts-ignore
      // this.addQualificationService.getEmployee().skillSet.push(id);

    } else {
      console.error("Ungültige ID: ID ist undefined.");
    }
  }

  createQualification (){
    this.createQualificationService.setValue(true)
  }

  onSearchQualification(searchtext: string) {
    this.searchtext = searchtext;
    this.filterQualifications()
  }

  private filterQualifications(): void {
    if (this.qualifications) {
      this.qualifications.subscribe(qualifications => {
        const filtered = qualifications.filter(qualification =>
          qualification.skill && qualification.skill.toLowerCase().includes(this.searchtext.toLowerCase())
        );
        this.filteredQualificationsSubject.next(filtered);
      });
    }
  }
}
