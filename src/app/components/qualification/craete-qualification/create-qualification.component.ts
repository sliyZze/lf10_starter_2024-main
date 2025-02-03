import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {EmployeeDataModalComponent} from "../../modal/employee-data-modal/employee-data-modal.component";
import {CreateQualificationService} from "../../services/CreateQualificationService";
import {QualificationComponent} from "../qualificationModal/qualificationModal.component";
import {DataService} from "../../../service/data.service";
import {AddQualification} from "../../../model/AddQualification";

@Component({
  selector: 'app-create-qualification',
  imports: [
    FormsModule,
    EmployeeDataModalComponent,
    QualificationComponent,
  ],
  templateUrl: './create-qualification.component.html',
  standalone: true,
  styleUrl: './create-qualification.component.css'
})
export class CreateQualificationComponent {
  protected title: string = "Qualification erstellen";
  @ViewChild(QualificationComponent) qualificationComponent!: QualificationComponent;

  constructor(protected createQualificationService: CreateQualificationService, private dataService: DataService) {
  }

  @Output() qualificationAdded = new EventEmitter<void>();

  qualification = "";

  onSaveChanges() {
    if (this.qualification.trim().length > 0) {
      const newQualification: AddQualification = { skill: this.qualification };
      this.dataService.addQualification(newQualification).subscribe({
        next: () => {
          this.qualificationAdded.emit();
          this.qualificationComponent.loadQualifications();
          this.createQualificationService.setValue(false)
          this.qualification = "";
        },
        error: (err) => {
          console.error('Fehler beim Aktualisieren:', err);
        },
      });
    } else {
      console.error('Eingabe ist leer.');
    }
  }

  closeModal() {
    this.createQualificationService.setValue(false)
  }

}
