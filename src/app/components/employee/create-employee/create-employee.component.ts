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
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [
    EmployeeDataModalComponent,
    FormsModule,
    ReactiveFormsModule,
    QualificationComponent,
    CreateQualificationComponent,
    NgForOf
  ],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent{
    title: string = "Mitarbeiter Erstellen";
    employee$!: Observable<Employee>;
    private subscriptions = new Subscription();
    constructor(protected createEmployeeService: CreateEmployeeService, private addQualificationService: AddQualificationService, private dataService: DataService) {

    }

  protected loadEmployee(): void {
      this.employee$ = this.dataService.getEmployee(this.employee.id);
      this.subscriptions.add(
        this.employee$.subscribe(employee => {
          this.employee = new AddEmployee(
            employee.id,
            employee.lastName,
            employee.firstName,
            employee.street,
            employee.postcode,
            employee.city,
            employee.phone,
            employee.skillSet?.map((skill: Skill) => skill.id!).filter(id => id !== undefined) || []
          );
        })
      );
  }


  onSaveChanges() {
    this.dataService.updateEmployee(this.employee).subscribe({
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

  onCreateQualificationClick() {
    this.dataService.getEmployees().subscribe({
      next: (employees) => {
        console.log("Erhaltene Mitarbeiter:", employees);
        const filteredEmployee = employees.find((employee: any) => employee.phone === "000000000");

        if (filteredEmployee) {
          this.employee = new AddEmployee(
            filteredEmployee?.id,
            filteredEmployee?.lastName,
            filteredEmployee?.firstName,
            filteredEmployee?.street,
            filteredEmployee?.postcode,
            filteredEmployee?.city,
            filteredEmployee?.phone,
            filteredEmployee?.skillSet?.map((skill: Skill) => skill.id).filter(id => id !== undefined) || []
          );

          console.log("Gefundener Mitarbeiter:", filteredEmployee);
          console.log("übertagener mitarbeiter",this.employee);

          //  Hier erst setzen, nachdem this.employee gefüllt ist
          this.addQualificationService.setValue(true);
          console.log("em id", this.employee);

          this.addQualificationService.setEmployee(this.employee);
          console.log("toketest");
        } else {
          console.warn("Kein Mitarbeiter mit der Telefonnummer 000000000 gefunden.");
        }
      },
      error: (err) => console.error("Fehler beim Abrufen der Mitarbeiter:", err),
    });
  }


  employee: AddEmployee = {
        lastName: "h",
        firstName: "h",
        street: "h",
        postcode: "22222",
        city: "h",
        phone: "@@@",
    };

}
