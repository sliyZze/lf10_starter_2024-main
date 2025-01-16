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

@Component({
  selector: 'app-employee-table',
  imports: [
    MainHeaderComponent,
    NgIf,
    FormsModule,
    EditEmployeeComponent,
    NgForOf
  ],
  standalone: true,
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.css'
})
export class EmployeeTableComponent {
  page: string = '';
  isValid: boolean = true;
  private modalRaf: NgbModalRef | undefined;
  employeeX!: Observable<Employee>;
  employees?: Employee[];
  private sub: Subscription = new Subscription();

  constructor(private editEmployeeService: EditEmployeeService, private modalService: NgbModal, private dataService: DataService) {
  }

  ngOnInit(): void{
    this.sub = this.dataService.getEmployees().subscribe((data: Employee[]) =>{
      this.employees = data;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  openModal(content: any) {
    this.modalRaf = this.modalService.open(content, { centered: true });
  }


  onEditEmployee(employeeId: number | undefined){
    this.editEmployeeService.setValue(true)
    this.editEmployeeService.setEmployeeId(employeeId)
    console.log(employeeId)
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

  }
}
