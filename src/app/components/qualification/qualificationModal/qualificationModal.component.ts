import {Component, ViewChild} from '@angular/core';
import {EmployeeDataModalComponent} from "../../modal/employee-data-modal/employee-data-modal.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {AddQualificationService} from "../../services/AddQualificationService";

@Component({
  selector: 'app-qualificationModal',
  standalone: true,
    imports: [
        EmployeeDataModalComponent,
        FormsModule,
        NgForOf,
        ReactiveFormsModule
    ],
  templateUrl: './qualificationModal.component.html',
  styleUrl: './qualificationModal.component.css'
})
export class QualificationModalComponent {
  @ViewChild(EmployeeDataModalComponent) modal!: EmployeeDataModalComponent;
  title: string = "Qualifikationen";
  constructor(protected addQualificationService: AddQualificationService) {}

  onSaveChanges() {
    this.modal.closeModal();
    this.addQualificationService.setValue(false);
  }

  closeModal() {
    this.modal.closeModal();
    this.addQualificationService.setValue(false);
  }

  getQualification(id: number) {
    console.log(this.qualifications[id]);
  }


  qualifications = [
    { qualification: 'Java', selected: false },
    { qualification: 'C#', selected: false },
    { qualification: 'Docker', selected: false },
    { qualification: 'JavaScript', selected: false },
    { qualification: 'TypeScript', selected: false },
    { qualification: 'Angular', selected: false },
  ];

}
