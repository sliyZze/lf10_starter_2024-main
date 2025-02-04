import {Component, OnInit, ViewChild} from '@angular/core';
import {EmployeeDataModalComponent} from "../../modal/employee-data-modal/employee-data-modal.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CreateEmployeeService} from "../../services/CreateEmployeeService";
import {AddQualificationService} from "../../services/AddQualificationService";
import {QualificationComponent} from "../../qualification/qualificationModal/qualificationModal.component";
import {DataService} from "../../../service/data.service";
import {AddEmployee} from "../../../model/AddEmployee";
import {CreateQualificationComponent} from "../../qualification/craete-qualification/create-qualification.component";
import {Skill} from "../../../model/Skill";
import {Observable, Subscription} from "rxjs";
import {Employee} from "../../../model/Employee";

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [
    EmployeeDataModalComponent,
    FormsModule,
    ReactiveFormsModule,
    QualificationComponent,
    CreateQualificationComponent
  ],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent{
    title: string = "Mitarbeiter Erstellen";
    employee$!: Observable<Employee>;
    private subscriptions = new Subscription();

    constructor(protected createEmployeeService: CreateEmployeeService, private addQualificationService: AddQualificationService, private dataService: DataService) {
      this.dataService.addEmployee(this.employee).subscribe();

      this.dataService.getEmployees().subscribe(employees => {
        const filteredEmployee = employees.find((employee: any) => employee.phone === "@@@");

        if (filteredEmployee) {
          this.employee = new AddEmployee(
            filteredEmployee.id,
            filteredEmployee.lastName,
            filteredEmployee.firstName,
            filteredEmployee.street,
            filteredEmployee.postcode,
            filteredEmployee.city,
            filteredEmployee.phone,
            filteredEmployee.skillSet?.map((skill: Skill) => skill.id).filter(id => id !== undefined) || []
          );
        }
      });
    }

  /*getD(){
    this.employee$ = this.dataService.getEmployee(this.employeeId);
    this.subscriptions.add(
      this.employee$.subscribe(employee => {
        this.employee = { ...employee };
      })
    );
  }*/

  onSaveChanges() {
    this.dataService.addEmployee(this.employee).subscribe({
      next: () => {
        this.dataService.loadEmployees();
        this.employee = {
          lastName: "",
          firstName: "",
          street: "",
          postcode: "",
          city: "",
          phone: "",
          skillSet: []
        };
      },
      error: (err) => console.error('Fehler beim Hinzufügen des Mitarbeiters:', err),
    });
    this.createEmployeeService.setValue(false);
  }

  closeModal() {
        this.createEmployeeService.setValue(false);
    }

    onCreateQualificationClick (){
      this.addQualificationService.setValue(true)
      this.addQualificationService.setEmployee(this.employee)

    }

    employee: AddEmployee = {
        lastName: "h",
        firstName: "h",
        street: "h",
        postcode: "22222",
        city: "h",
        phone: "@@@",
        skillSet: []
    };


}
