import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForOf } from "@angular/common";
import { NavigationService } from "../../services/NavigationService";
import { MainHeaderComponent } from "../../header/main-header/main-header.component";
import { QualificationTargetService } from "../../services/QualificationTargetService";
import { DataService } from "../../../service/data.service";
import { Skill } from "../../../model/Skill";
import {BehaviorSubject, switchMap} from "rxjs";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { EmployeeDataModalComponent } from "../../modal/employee-data-modal/employee-data-modal.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EditQualificationService } from "../../services/EditQualificationService";
import { MatPaginator, MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import {CreatQualificationInQualiPageService} from "../../services/CreatQualificationInQualiPageService";
import {CreateQualificationComponent} from "../craete-qualification/create-qualification.component";
import {CreateQualificationService} from "../../services/CreateQualificationService";
import {AddQualification} from "../../../model/AddQualification";
import {AddEmployee} from "../../../model/AddEmployee";

@Component({
  selector: 'app-qualification-page',
  imports: [
    NgForOf,
    MainHeaderComponent,
    EmployeeDataModalComponent,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    CreateQualificationComponent
  ],
  templateUrl: './qualification-page.component.html',
  standalone: true,
  styleUrl: './qualification-page.component.css'
})
export class QualificationPageComponent implements OnInit {
  private qualificationsSubject = new BehaviorSubject<Skill[]>([]);
  @ViewChild('deleteQualificationModal', { static: true }) deleteQualificationModal!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(EmployeeDataModalComponent) modal!: EmployeeDataModalComponent;
  @ViewChild("qualificationDeleteError", {static: true}) qualificationDeleteError!: TemplateRef<any>;
  protected modalRef!: NgbModalRef;
  private getQualificationIdForDelete: number | undefined = undefined;
  title: string = "Qualifikation bearbeiten";
  createQualiTitle: string = "Qualifikation erstellen";
  protected qualification: string = "";

  pagedQualifications?: Skill[];
  totalItems: number = 0;
  pageSize: number = 5;
  currentPage: number = 0;
  searchtext: string = "";

  constructor(
      private navigationService: NavigationService,
      private qualificationTargetService: QualificationTargetService,
      private dataService: DataService,
      private modalService: NgbModal,
      protected editQualificationService: EditQualificationService,
      protected createQualificationService: CreateQualificationService
  ) {}

  ngOnInit() {
    this.loadQualifications();
  }

  onSearchQualification(searchtext: string) {
    this.searchtext = searchtext;
    this.updatePagedQualifications();
    this.paginator.firstPage();
  }

  private filterQualifications(qualifications: Skill[]): Skill[] {


    const lowerCaseSearchText = this.searchtext.toLowerCase().trim();
    let pagedQualifications: Skill[];

    if (lowerCaseSearchText === '') {
      this.totalItems = this.qualificationsSubject.value.length;
      return qualifications;
    } else {
      return qualifications
        .filter(qual => qual.skill?.toLowerCase().includes(lowerCaseSearchText))
        .sort((a, b) => {
          const aLower = a.skill?.toLowerCase() || "";
          const bLower = b.skill?.toLowerCase() || "";

          const aStarts = aLower.startsWith(lowerCaseSearchText);
          const bStarts = bLower.startsWith(lowerCaseSearchText);

          if (aStarts && !bStarts) return -1;
          if (!aStarts && bStarts) return 1;
          return aLower.localeCompare(bLower);
        });
    }
    return [];
  }





  private loadQualifications() {
    this.dataService.getQualifications().subscribe({
      next: (qualifications) => {
        this.qualificationsSubject.next(qualifications);
        this.updatePagedQualifications();
        this.totalItems = qualifications.length;
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

    this.dataService.deleteQualification(id).pipe(
        switchMap(() => this.dataService.getQualifications())
    ).subscribe({
      next: (updatedQualification) => {
        this.qualificationsSubject.next(updatedQualification);
        this.totalItems = updatedQualification.length;
        this.updatePagedQualifications();
        this.modalRef.close()
      },
      error: (err) => {
        this.modalRef.close()
        this.openQualificationDeleteErrorModal()
      }
    });
  }

  openQualificationDeleteErrorModal(){
    this.modalRef = this.modalService.open(this.qualificationDeleteError, {ariaLabelledBy: "qualificationDeleteError"})
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
    let qualis = this.filterQualifications(this.qualificationsSubject.value);
    this.totalItems = qualis.length;
    this.pagedQualifications = qualis.slice(startIndex, endIndex);
  }


  onBackClick() {
    this.navigationService.redirectToEmployeeTable();
    this.qualificationTargetService.setValue("Mitarbeitertabelle");
  }

  qualiAdd: AddQualification = {
    skill: ""
  };

  editQualification(id: number | undefined) {
    this.editQualificationService.setValue(true);
    this.editQualificationService.setQid(id);
  }

  closeModal() {
    this.editQualificationService.setValue(false);
  }

  onSaveChanges() {
    this.editQualificationService.setValue(false);
    this.qualiAdd.skill = this.qualification
    this.dataService.updateQualification(this.qualiAdd, this.editQualificationService.getQid())
      .subscribe({
        next: response => console.log('Update Qualification erfolgreich:', response),
        error: err => console.error('Fehler beim API-Update:', err)
      });

  }

  addQualification() {
    this.createQualificationService.setValue(true)
  }

  onSaveCreateQualChanges() {
    this.createQualificationService.setValue(false)
  }

  closeCreateQualModal() {
    this.createQualificationService.setValue(false)
  }

  closeQualificationDeleteErrorModal() {
    this.modalRef.close()
  }
}
