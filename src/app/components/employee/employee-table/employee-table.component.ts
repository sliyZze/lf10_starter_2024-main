import
{Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MainHeaderComponent} from '../../header/main-header/main-header.component';
import {NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {EditEmployeeService} from "../../services/EmployeeEditService";
import {EditEmployeeComponent} from "../edit-employee/edit-employee.component";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {Observable, Subscription} from "rxjs";
import {Employee} from "../../../model/Employee";
import {DataService} from "../../../service/data.service";
import {CreateEmployeeComponent} from "../create-employee/create-employee.component";
import {CreateEmployeeService} from "../../services/CreateEmployeeService";

@Component({
  selector: 'app-employee-table',
  imports: [
    MainHeaderComponent,
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
  filteredEmployees?: Employee[];
  private sub: Subscription = new Subscription();
  currentEmployeeId?: number;
  @ViewChild('deleteEmployee', {static: true}) deleteEmployeeModal!: TemplateRef<any>;
  protected modalRef!: NgbModalRef;
  private getEmployeeIdForDelete: number | undefined = undefined;

  constructor(private editEmployeeService: EditEmployeeService, private modalService: NgbModal, private dataService: DataService, private createEmployeeService: CreateEmployeeService) {
  }

  ngOnInit(): void {
    this.sub = this.dataService.getEmployees().subscribe({
      next: (data: Employee[]) => {
        this.employees = data;
        console.log(data)
      },
      error: (err) => {
        console.error('Fehler beim Abrufen der Mitarbeiterdaten:', err);
      },
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSerchEmployee(searchtext: string) {
    if (!this.employees) return;

    const lowerCaseSearchText = searchtext.toLowerCase().trim();

    this.filteredEmployees = this.employees.filter(emp =>
        emp.firstName?.toLowerCase().includes(lowerCaseSearchText) ||
        emp.lastName?.toLowerCase().includes(lowerCaseSearchText) ||
        emp.city?.toLowerCase().includes(lowerCaseSearchText) ||
        emp.street?.toLowerCase().includes(lowerCaseSearchText) ||
        emp.postcode?.toString().includes(lowerCaseSearchText) ||
        emp.skillSet?.some(skill => skill.skill?.toLowerCase().includes(lowerCaseSearchText)) // Später aktivieren
    );
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
          this.modalRef.close()
          this.ngOnInit();
        },
        error: (err) => console.error('Fehler beim Löschen:', err),
      });
      this.getEmployeeIdForDelete = undefined;
    }
  }


}
