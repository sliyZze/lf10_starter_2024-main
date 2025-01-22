import {Component} from '@angular/core';
import {MainHeaderComponent} from '../../header/main-header/main-header.component';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {EditEmployeeService} from "../../services/EmployeeEditService";
import {EditEmployeeComponent} from "../edit-employee/edit-employee.component";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {Observable, Subscription} from "rxjs";
import {Employee} from "../../../model/Employee";
import {DataService} from "../../../service/data.service";
import {AddQualificationService} from "../../services/AddQualificationService";
import {CreateEmployeeComponent} from "../create-employee/create-employee.component";
import {CreateEmployeeService} from "../../services/CreateEmployeeService";

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
export class EmployeeTableComponent {
  page: string = '';
  isValid: boolean = true;
  private modalRaf: NgbModalRef | undefined;
  employee!: Observable<Employee>;
  employees?: Employee[];
  private sub: Subscription = new Subscription();

  constructor(private editEmployeeService: EditEmployeeService, private modalService: NgbModal, private dataService: DataService, private createEmployeeService: CreateEmployeeService) {
  }

  ngOnInit(): void {
    this.sub = this.dataService.getEmployees().subscribe({
      next: (data: Employee[]) => {
        this.employees = data;
        console.log(this.employee)
      },
      error: (err) => {
        console.error('Fehler beim Abrufen der Mitarbeiterdaten:', err);
      },
    });
  }

  onEditEmployee(employeeId: number | undefined){
    this.editEmployeeService.setValue(true)
    this.editEmployeeService.setEmployeeId(employeeId)

  }

  onDeleteEmployee(id: number | undefined){
    this.dataService.deleteEmployee(id).subscribe({
      next: () => {
        console.log(`Mitarbeiter mit ID ${id} wurde gelöscht.`);
        this.ngOnInit(); // Optional: Aktualisiere die Tabelle.
      },
      error: (err) => console.error('Fehler beim Löschen:', err),
    });
  }

  validatePageInput() {
    return this.isValid = !isNaN(Number(this.page)) && this.page.trim() !== '' || this.page.length == 0;
  }

  onAddClick(){
    this.createEmployeeService.setValue(true)
  }
}
