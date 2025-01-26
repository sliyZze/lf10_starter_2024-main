import {Component, ViewChild} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {EmployeeDataModalComponent} from "../../modal/employee-data-modal/employee-data-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CreateQualificationService} from "../../services/CreateQualificationService";
import {AsyncPipe, NgForOf} from "@angular/common";
import {async} from "rxjs";
import {QualificationComponent} from "../qualificationModal/qualificationModal.component";
import {DataService} from "../../../service/data.service";
import {AddQualification} from "../../../model/AddQualification";

@Component({
  selector: 'app-craete-qualification',
  imports: [
    FormsModule,
    EmployeeDataModalComponent,
    NgForOf,
    AsyncPipe,
    QualificationComponent
  ],
  templateUrl: './create-qualification.component.html',
  standalone: true,
  styleUrl: './create-qualification.component.css'
})
export class CreateQualificationComponent {
  protected qualifications: string[] = []
  protected title: string = "Qualification erstellen";
  @ViewChild(EmployeeDataModalComponent) modal!: EmployeeDataModalComponent;
  @ViewChild(QualificationComponent) qualificationComponent!: QualificationComponent;

  constructor(protected createQualificationService: CreateQualificationService, private dataService: DataService) {
  }

  qualification = "";

  onSaveChanges() {
    if (this.qualification.trim().length > 0) {
      const newQualification: AddQualification = { skill: this.qualification };
      this.dataService.addQualification(newQualification).subscribe({
        next: () => {
          this.qualificationComponent.loadQualifications();
          this.createQualificationService.setValue(false)
          this.modal.closeModal();
        },
        error: (err) => {
          console.error('Fehler beim Hinzufügen:', err);
        },
      });
    } else {
      console.error('Eingabe ist leer.');
    }
  }

  closeModal() {
    this.createQualificationService.setValue(false)
    this.modal.closeModal();
  }

  protected readonly async = async;
}
