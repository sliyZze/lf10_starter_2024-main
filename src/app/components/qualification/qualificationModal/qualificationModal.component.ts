import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {EmployeeDataModalComponent} from "../../modal/employee-data-modal/employee-data-modal.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AsyncPipe, NgForOf} from "@angular/common";
import {AddQualificationService} from "../../services/AddQualificationService";
import {DataService} from "../../../service/data.service";
import {async, Observable, Subscription} from "rxjs";
import {Skill} from "../../../model/Skill";
import {CreateQualificationService} from "../../services/CreateQualificationService";
import { BehaviorSubject } from 'rxjs';

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
  selectedQualifications: Skill[] = [];
  savedQualifications: Skill[] = [];
  searchtext: string = "";

  constructor(
    protected addQualificationService: AddQualificationService,
    private dataService: DataService,
    private createQualificationService: CreateQualificationService
  ) {}

  ngOnInit() {
    this.loadQualifications()
  }

  loadQualifications(): void {
    this.qualifications = this.dataService.getQualifications();
    this.qualifications?.subscribe(qualifications => {
      this.filteredQualificationsSubject.next([...qualifications]);
    });
  }

  closeModal() {
    this.addQualificationService.setValue(false);
  }

  onSaveChanges() {
    if (this.selectedQualifications.length > 0) {
      this.savedQualifications = [...this.selectedQualifications];

      this.createQualificationService.updateSavedQualifications(this.savedQualifications);

      const employee = this.addQualificationService.getEmployee();
      employee.skillSet!.push(...this.selectedQualifications.map(skill => skill.id!));
    }

    this.addQualificationService.setValue(false);
    console.log(this.savedQualifications);
  }

  getQualification(qualification: Skill, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const isChecked = inputElement.checked;

    if (isChecked) {
      this.selectedQualifications.push(qualification);
    } else {
      this.selectedQualifications = this.selectedQualifications.filter(q => q.id !== qualification.id);
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
