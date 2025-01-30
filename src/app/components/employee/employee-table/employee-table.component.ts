import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MainHeaderComponent} from '../../header/main-header/main-header.component';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {EditEmployeeService} from "../../services/EmployeeEditService";
import {EditEmployeeComponent} from "../edit-employee/edit-employee.component";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {Observable, Subscription} from "rxjs";
import {Employee} from "../../../model/Employee";
import {DataService} from "../../../service/data.service";
import {CreateEmployeeComponent} from "../create-employee/create-employee.component";
import {CreateEmployeeService} from "../../services/CreateEmployeeService";
import {CreateQualificationComponent} from "../../qualification/craete-qualification/create-qualification.component";

@Component({
  selector: 'app-employee-table',
  imports: [
    MainHeaderComponent,
    NgIf,
    FormsModule,
    EditEmployeeComponent,
    NgForOf,
    CreateEmployeeComponent
  ],
  standalone: true,
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.css'
})
export class EmployeeTableComponent implements OnInit, OnDestroy{
  page: string = '';
  isValid: boolean = true;
  employee!: Observable<Employee>;
  employees?: Employee[];
  unfilteredEmployees?: Employee[];
  searchtext: string = "";
  private sub: Subscription = new Subscription();
  currentEmployeeId?: number;
  @ViewChild('deleteEmployee', {static: true}) deleteEmployeeModal!: TemplateRef<any>;
  protected modalRef!: NgbModalRef;
  private getEmployeeIdForDelete: number | undefined = undefined;

  constructor(private editEmployeeService: EditEmployeeService, private modalService: NgbModal, private dataService: DataService, private createEmployeeService: CreateEmployeeService) {
  }

  ngOnInit(): void {
    this.sub = this.dataService.employees$.subscribe({
      next: (data: Employee[]) => {
        this.employees = data;
        console.log("Mitarbeiter geladen:", data);
      },
      error: (err) => console.error('Fehler beim Abrufen der Mitarbeiter:', err),
    });

    this.dataService.loadEmployees();
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSearchEmployee(searchtext: string) {
    this.searchtext = searchtext;
    this.filterEmployees(this.employees);
  }



  private filterEmployees(employees?: Employee[]) {
    if (!employees) return ;
    let lowerCaseSearchText = this.searchtext.toLowerCase().trim();

    if (lowerCaseSearchText === '') {
      this.ngOnInit();
    } else {
      this.employees = employees
        .filter(emp =>
          emp.firstName?.toLowerCase().includes(lowerCaseSearchText) ||
          emp.lastName?.toLowerCase().includes(lowerCaseSearchText) ||
          emp.city?.toLowerCase().includes(lowerCaseSearchText) ||
          emp.street?.toLowerCase().includes(lowerCaseSearchText) ||
          emp.skillSet?.some(skill => skill.skill?.toLowerCase().includes(lowerCaseSearchText)) ||
          emp.postcode?.toString().includes(lowerCaseSearchText)
        )
        .sort((a, b) => {
          const aFirst = a.firstName?.toLowerCase() || "";
          const bFirst = b.firstName?.toLowerCase() || "";
          const aLast = a.lastName?.toLowerCase() || "";
          const bLast = b.lastName?.toLowerCase() || "";
          const aCity = a.city?.toLowerCase() || "";
          const bCity = b.city?.toLowerCase() || "";
          const aHasSkill = a.skillSet?.some(skill => skill.skill?.toLowerCase().includes(lowerCaseSearchText)) ? 1 : 0;
          const bHasSkill = b.skillSet?.some(skill => skill.skill?.toLowerCase().includes(lowerCaseSearchText)) ? 1 : 0;

          const aFirstStarts = aFirst.startsWith(lowerCaseSearchText);
          const bFirstStarts = bFirst.startsWith(lowerCaseSearchText);

          if (aFirstStarts && !bFirstStarts) return -1;
          if (!aFirstStarts && bFirstStarts) return 1;

          const aLastStarts = aLast.startsWith(lowerCaseSearchText);
          const bLastStarts = bLast.startsWith(lowerCaseSearchText);

          if (aLastStarts && !bLastStarts) return -1;
          if (!aLastStarts && bLastStarts) return 1;

          const aFirstContains = aFirst.includes(lowerCaseSearchText);
          const bFirstContains = bFirst.includes(lowerCaseSearchText);

          if (aFirstContains && !bFirstContains) return -1;
          if (!aFirstContains && bFirstContains) return 1;

          const aLastContains = aLast.includes(lowerCaseSearchText);
          const bLastContains = bLast.includes(lowerCaseSearchText);

          if (aLastContains && !bLastContains) return -1;
          if (!aLastContains && bLastContains) return 1;

          const aCityContains = aCity.includes(lowerCaseSearchText);
          const bCityContains = bCity.includes(lowerCaseSearchText);

          if (aCityContains && !bCityContains) return -1;
          if (!aCityContains && bCityContains) return 1;

          if (aHasSkill > bHasSkill) return -1;
          if (aHasSkill < bHasSkill) return 1;

          return aLast.localeCompare(bLast) || aFirst.localeCompare(bFirst);
        });
    }
  }




  onEditEmployee(employeeId: number | undefined){
    this.editEmployeeService.setValue(true)
    this.currentEmployeeId = employeeId;

  }

  onDeleteEmployee(id: number | undefined){
    this.getEmployeeIdForDelete = id;
    this.openDeleteModal()
  }

  validatePageInput() {
    return this.isValid = !isNaN(Number(this.page)) && this.page.trim() !== '' || this.page.length == 0;
  }

  onAddClick(){
    this.createEmployeeService.setValue(true)
  }

  openDeleteModal() {
    this.modalRef = this.modalService.open(this.deleteEmployeeModal, {ariaLabelledBy: 'deleteModalLabel'});
  }

  confirmDelete() {
    if (this.getEmployeeIdForDelete !== undefined) {
      console.log(this.getEmployeeIdForDelete + " getEmployeeIdForDelete");
      this.dataService.deleteEmployee(this.getEmployeeIdForDelete).subscribe({
        next: () => {
          console.log(`Mitarbeiter mit ID ${this.getEmployeeIdForDelete} wurde gelöscht.`);
          this.ngOnInit(); // Optional: Aktualisiere die Tabelle.
        },
        error: (err) => console.error('Fehler beim Löschen:', err),
      });
      this.getEmployeeIdForDelete = undefined;
      this.modalRef.close()
    }
  }


}
