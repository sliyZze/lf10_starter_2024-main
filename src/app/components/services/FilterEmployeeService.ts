import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterEmployeeService {
  private modalState = new BehaviorSubject<boolean>(false);
  private selectedFiltersSubject = new BehaviorSubject<{qualifications: string[], cities: string[]}>({qualifications: [], cities: []});
  selectedFilters$ = this.selectedFiltersSubject.asObservable();

  setValue(value: boolean) {
    this.modalState.next(value);
  }

  getValue() {
    return this.modalState.asObservable();
  }

  applySelectedFilters(qualifications: string[], cities: string[]) {
    this.selectedFiltersSubject.next({ qualifications, cities });
  }

   setFilters(qualifications: string[], cities: string[]) {
     this.selectedFiltersSubject.next({ qualifications, cities });
   }

  // Optional: Falls du die Filter zurücksetzen möchtest
  resetFilters() {
    this.selectedFiltersSubject.next({ qualifications: [], cities: [] });
  }
}
