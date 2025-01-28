import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgForOf } from "@angular/common";
import { NavigationService } from "../../services/NavigationService";
import { MainHeaderComponent } from "../../header/main-header/main-header.component";
import { QualificationTargetService } from "../../services/QualificationTargetService";
import { DataService } from "../../../service/data.service";
import { Skill } from "../../../model/Skill";
import { BehaviorSubject, switchMap } from "rxjs";

@Component({
  selector: 'app-qualification-page',
  imports: [NgForOf, MainHeaderComponent, AsyncPipe],
  templateUrl: './qualification-page.component.html',
  standalone: true,
  styleUrl: './qualification-page.component.css'
})
export class QualificationPageComponent implements OnInit {
  private qualificationsSubject = new BehaviorSubject<Skill[]>([]);
  qualifications$ = this.qualificationsSubject.asObservable();

  constructor(
      private navigationService: NavigationService,
      private targetService: QualificationTargetService,
      private dataService: DataService
  ) {}

  ngOnInit() {
    this.loadQualifications();
  }

  private loadQualifications() {
    this.dataService.getQualifications().subscribe({
      next: (qualifications) => this.qualificationsSubject.next(qualifications),
      error: (err) => console.error('Fehler beim Laden der Qualifikationen:', err)
    });
  }

  deleteQualification(id: number | undefined) {
    if (!id) {
      console.log("Ungültige ID: ID ist undefined.");
      return;
    }

    this.dataService.deleteQualification(id).pipe(
        switchMap(() => this.dataService.getQualifications())
    ).subscribe({
      next: (updatedQualifications) => {
        this.qualificationsSubject.next(updatedQualifications);
        console.log(`Qualifikation mit ID ${id} erfolgreich gelöscht.`);
      },
      error: (err) => {
        console.error(`Fehler beim Löschen der Qualifikation mit ID ${id}:`, err);
      }
    });
  }

  onBackClick() {
    this.navigationService.redirectToEmployeeTable();
    this.targetService.setValue("Mitarbeitertabelle");
  }

  editQualification(id: number | undefined) {

  }

  addQualification() {

  }
}
