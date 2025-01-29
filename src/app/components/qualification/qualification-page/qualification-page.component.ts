import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AsyncPipe, NgForOf } from "@angular/common";
import { NavigationService } from "../../services/NavigationService";
import { MainHeaderComponent } from "../../header/main-header/main-header.component";
import { QualificationTargetService } from "../../services/QualificationTargetService";
import { DataService } from "../../../service/data.service";
import { Skill } from "../../../model/Skill";
import { BehaviorSubject } from "rxjs";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { EmployeeDataModalComponent } from "../../modal/employee-data-modal/employee-data-modal.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EditQualificationService } from "../../services/EditQualificationService";
import { MatPaginator, MatPaginatorModule, PageEvent } from "@angular/material/paginator";

@Component({
  selector: 'app-qualification-page',
  imports: [
    NgForOf,
    MainHeaderComponent,
    AsyncPipe,
    EmployeeDataModalComponent,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ],
  templateUrl: './qualification-page.component.html',
  standalone: true,
  styleUrl: './qualification-page.component.css'
})
export class QualificationPageComponent implements OnInit {
  private qualificationsSubject = new BehaviorSubject<Skill[]>([]);
  qualifications$ = this.qualificationsSubject.asObservable();

  @ViewChild('deleteQualificationModal', { static: true }) deleteQualificationModal!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(EmployeeDataModalComponent) modal!: EmployeeDataModalComponent;

  protected modalRef!: NgbModalRef;
  private getQualificationIdForDelete: number | undefined = undefined;

  title: string = "Qualifikation bearbeiten";
  protected qualification: string = "";

  pagedQualifications: Skill[] = [];
  filteredQualifications: Skill[] = [];
  totalItems: number = 0;
  pageSize: number = 5;
  currentPage: number = 0;

  constructor(
      private navigationService: NavigationService,
      private targetService: QualificationTargetService,
      private dataService: DataService,
      private modalService: NgbModal,
      protected editQualificationService: EditQualificationService
  ) {}

  ngOnInit() {
    this.loadQualifications();
  }

  onSearchQualification(searchtext: string) {
    if (!this.qualificationsSubject.value) return;

    const lowerCaseSearchText = searchtext.toLowerCase().trim();

    this.filteredQualifications = this.qualificationsSubject.value.filter(qual =>
      qual.skill?.toLowerCase().includes(lowerCaseSearchText)
    );

    this.totalItems = this.filteredQualifications.length;
    this.updatePagedQualifications();
  }


  private loadQualifications() {
    this.dataService.getQualifications().subscribe({
      next: (qualifications) => {
        this.qualificationsSubject.next(qualifications);
        this.totalItems = qualifications.length;
        this.updatePagedQualifications();
      },
      error: (err) => console.error('Fehler beim Laden der Qualifikationen:', err)
    });
  }

  deleteQualification(id: number | undefined) {
    if (id !== undefined) {
      this.getQualificationIdForDelete = id;
      this.openDeleteModal();
    }
  }

  openDeleteModal() {
    this.modalRef = this.modalService.open(this.deleteQualificationModal, { ariaLabelledBy: 'deleteModalLabel' });
  }

  confirmDelete() {
    if (!this.getQualificationIdForDelete) {
      console.log("Ungültige ID: ID ist undefined.");
      return;
    }
    let id: number = this.getQualificationIdForDelete;

    this.dataService.deleteQualification(id).subscribe({
      next: () => {
        this.loadQualifications();
        this.modalRef.close();
      },
      error: (err) => {
        console.error(`Fehler beim Löschen der Qualifikation mit ID ${id}:`, err);
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePagedQualifications();
  }

  private updatePagedQualifications() {
    if (!this.qualificationsSubject.value) return;

    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedQualifications = this.qualificationsSubject.value.slice(startIndex, endIndex);
  }


  onBackClick() {
    this.navigationService.redirectToEmployeeTable();
    this.targetService.setValue("Mitarbeitertabelle");
  }

  editQualification(id: number | undefined) {
    this.editQualificationService.setValue(true);
  }

  closeModal() {
    this.editQualificationService.setValue(false);
    this.modal.closeModal();
  }

  onSaveChanges() {
    this.editQualificationService.setValue(false);
  }

  addQualification() {
    // Add new qualification logic
  }
}
