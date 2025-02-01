import { Component } from '@angular/core';
import {EmployeeDataModalComponent} from "../employee-data-modal/employee-data-modal.component";
import {FilterEmployeeService} from "../../services/FilterEmployeeService";
import {AsyncPipe, NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {SortEmployeeService} from "../../services/SortEmployeeService";

@Component({
  selector: 'app-filter-sort-employee-component',
  imports: [
    EmployeeDataModalComponent,
    NgForOf,
    FormsModule,
    AsyncPipe
  ],
  templateUrl: './filter-sort-employee-component.component.html',
  standalone: true,
  styleUrl: './filter-sort-employee-component.component.css'
})
export class FilterSortEmployeeComponentComponent {
  title: string = "Filtern";
  sortTitle: string = "Sortieren"
  qualifications = ["Java", "C#", "Python", "JavaScript", "Rust", "PHP"];
  cities = ["Bremen", "Hessen", "Berlin", "München"];

  constructor(
    protected filterEmployeeService: FilterEmployeeService,
    protected sortEmployeeService: SortEmployeeService
    ) {
  }

  applyFilters() {
    this.filterEmployeeService.setValue(false);
  }

  closeModal() {
    this.filterEmployeeService.setValue(false);
  }

  closeSortModal() {
    this.sortEmployeeService.setValue(false)
  }

  applySort() {
    this.sortEmployeeService.setValue(false)
  }
}
