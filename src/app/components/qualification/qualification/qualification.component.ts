import {Component, ViewChild} from '@angular/core';
import {EmployeeDataModalComponent} from "../../modal/employee-data-modal/employee-data-modal.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {AddQualificationService} from "../../services/AddQualificationService";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DataService} from "../../../service/data.service";
import {Employee} from "../../../model/Employee";
import {async, Observable, Subscription} from "rxjs";
import {Skill} from "../../../model/Skill";

@Component({
  selector: 'app-qualification',
  standalone: true,
  imports: [
    EmployeeDataModalComponent,
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './qualification.component.html',
  styleUrl: './qualification.component.css'
})
export class QualificationComponent {
  @ViewChild(EmployeeDataModalComponent) modal!: EmployeeDataModalComponent;
  title: string = "Qualifikationen";
  constructor(protected addQualificationService: AddQualificationService, private dataService: DataService) {}
  private sub: Subscription = new Subscription();
  qualifications?: Observable<Skill[]>;

  /*ngOnInit(): void {
    this.sub = this.dataService.getQualifications().subscribe({
      next: (data: Skill[]) => {
        this.qualifications = data;
      },
      error: (err) => {
        console.error('Fehler beim Abrufen der Qualifications:', err);
      },
    });
  }*/

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


  protected readonly async = async;
}
