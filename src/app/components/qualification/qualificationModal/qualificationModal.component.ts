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
  private qualificationIdsList: number[] | null = null;

  constructor(protected addQualificationService: AddQualificationService, private dataService: DataService, private createQualificationService: CreateQualificationService) {}

  ngOnInit() {
    this.loadQualifications()
  }

  // Wird durch Button-Click aufgerufen
  loadQualifications(): void {
      this.qualifications = this.dataService.getQualifications();
  }

  onSaveChanges() {
    this.modal.closeModal();
    this.addQualificationService.setValue(false);
    console.log(this.qualificationIdsList);
  }

  closeModal() {
    this.modal.closeModal();
    this.addQualificationService.setValue(false);
  }

  getQualification(id: number | undefined) {
    if (id !== undefined) {
      this.qualificationIdsList?.push(id)
      // @ts-ignore
      this.addQualificationService.getEmployee().skillSet.push(id);
      console.log(id)
    } else {
      console.error("Ungültige ID: ID ist undefined.");
    }
  }

  createQualification (){
    this.createQualificationService.setValue(true)
  }

}
