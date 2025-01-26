import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {EmployeeDataModalComponent} from "../../modal/employee-data-modal/employee-data-modal.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AsyncPipe, NgForOf} from "@angular/common";
import {AddQualificationService} from "../../services/AddQualificationService";
import {DataService} from "../../../service/data.service";
import {async, Observable, Subscription} from "rxjs";
import {Skill} from "../../../model/Skill";
import {CreateQualificationService} from "../../services/CreateQualificationService";

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
  @Input() createdQualification: string = ""

  constructor(protected addQualificationService: AddQualificationService, private dataService: DataService, private createQualificationService: CreateQualificationService) {}

  ngOnInit() {
    this.loadQualifications()
  }

  // Wird durch Button-Click aufgerufen
  loadQualifications(): void {
      this.qualifications = this.dataService.getQualifications();
      this.qualifications.subscribe((quali: Skill[]) => {console.log(quali)});

  }

  onSaveChanges() {
    this.modal.closeModal();
    this.addQualificationService.setValue(false);
  }

  closeModal() {
    this.modal.closeModal();
    this.addQualificationService.setValue(false);
  }

  getQualification(id: number | undefined) {
    console.log(id);
    if (id !== undefined) {
      // @ts-ignore
      this.addQualificationService.getEmployee().skillSet.push(id);
    } else {
      console.error("Ungültige ID: ID ist undefined.");
    }
  }

  createQualification (){
    this.createQualificationService.setValue(true)
  }

}
