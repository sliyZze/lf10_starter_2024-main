import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {NavigationService} from "../../services/NavigationService";
import {MainHeaderComponent} from "../../header/main-header/main-header.component";
import {QualificationTargetService} from "../../services/QualificationTargetService";

@Component({
  selector: 'app-qualification-page',
  imports: [
    NgForOf,
    MainHeaderComponent
  ],
  templateUrl: './qualification-page.component.html',
  standalone: true,
  styleUrl: './qualification-page.component.css'
})
export class QualificationPageComponent {
  qualifications: string[] = ['Qualifikation 1', 'Qualifikation 2'];

  constructor(private navigationService: NavigationService, private targetService: QualificationTargetService) {
  }

  addQualification() {
    const newQualification = prompt('Neue Qualifikation eingeben:');
    if (newQualification) {
      this.qualifications.push(newQualification);
    }
  }

  editQualification(index: number) {
    const editedQualification = prompt('Qualifikation bearbeiten:', this.qualifications[index]);
    if (editedQualification) {
      this.qualifications[index] = editedQualification;
    }
  }

  deleteQualification(index: number) {
    if (confirm('Möchten Sie diese Qualifikation wirklich löschen?')) {
      this.qualifications.splice(index, 1);
    }
  }

  onBackClick(){
    this.navigationService.redirectToEmployeeTable()
    this.targetService.setValue("Mitarbeitertabelle")
  }
}
