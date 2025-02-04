import {Component, OnInit} from '@angular/core';
import {EmployeeDataModalComponent} from "../employee-data-modal/employee-data-modal.component";
import {FilterEmployeeService} from "../../services/FilterEmployeeService";
import {AsyncPipe, NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {SortEmployeeService} from "../../services/SortEmployeeService";
import {DataService} from "../../../service/data.service";
import {BehaviorSubject, Subscription} from "rxjs";
import {Skill} from "../../../model/Skill";
import {Employee} from "../../../model/Employee";


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
export class FilterSortEmployeeComponentComponent implements OnInit{
  selectedQualifications: string[] = [];
  selectedCities: string[] = [];
  private sub: Subscription = new Subscription();
  title: string = "Filtern";
  sortTitle: string = "Sortieren"
  qualifications: string[] = [];
  cities: string[] = [];

  constructor(
    protected filterEmployeeService: FilterEmployeeService,
    protected sortEmployeeService: SortEmployeeService,
    private dataService: DataService,
    ) {
  }

  ngOnInit() {
    this.loadFilterobjekts();
  }

  loadFilterobjekts() {
    this.dataService.getQualifications().subscribe({
      next: (data) => {
        this.qualifications = data.map(skill => skill.skill ?? '');
      },
      error: (error) => {
        console.error('Fehler beim Laden der Qualifikationen:', error);
      }
    });
    this.sub = this.dataService.employees$.subscribe({
      next: (data: Employee[]) => {
        this.cities = [...new Set(
          data
            .map(employee => employee.city)
            .filter((city) => typeof city === "string")
        )];
      },
      error: (err) => console.error('Fehler beim Abrufen der Mitarbeiter:', err),
    });

    this.dataService.loadEmployees();
  }

  isChecked(value: string): boolean {
    return this.selectedQualifications.includes(value) || this.selectedCities.includes(value);
  }

  onQualificationChange(qualification: string, isChecked: boolean) {
    console.log(isChecked);
    if (isChecked) {
      this.selectedQualifications.push(qualification);
    } else {
      const index = this.selectedQualifications.indexOf(qualification);
      if (index > -1) {
        this.selectedQualifications.splice(index, 1);
      }
    }
    console.log('Ausgewählte Qualifikationen:', this.selectedQualifications);
  }

  onCityChange(city: string, isChecked: boolean) {
    console.log(isChecked);
    if (isChecked) {
      this.selectedCities.push(city);
    } else {
      const index = this.selectedCities.indexOf(city);
      if (index > -1) {
        this.selectedCities.splice(index, 1);
      }
    }
    console.log('Ausgewählte Städte:', this.selectedCities);
  }


  onSortChange(field: string, order: 'asc' | 'desc') {
    if (field === 'name') {
      this.sortEmployeeService.setSortCriteria({ field: 'name', order });
    } else if (field === 'qual') {
      this.sortEmployeeService.setSortCriteria({ field: 'qualifications', order });
    }
  }


  applyFilters() {
    this.filterEmployeeService.setValue(false);
    this.filterEmployeeService.setFilters(this.selectedQualifications, this.selectedCities);
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
