
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface SortCriteria {
  field: string;
  order: 'asc' | 'desc';
}

@Injectable({
  providedIn: 'root'
})
export class SortEmployeeService {
  private modalState = new BehaviorSubject<boolean>(false);

  private sortCriteria = new BehaviorSubject<SortCriteria>({
    field: 'name',
    order: 'asc'
  });

  setSortCriteria(criteria: SortCriteria) {
    this.sortCriteria.next(criteria);
  }

  getSortCriteria() {
    return this.sortCriteria.asObservable();
  }

  setValue(value: boolean) {
    this.modalState.next(value);
  }

  getValue() {
    return this.modalState.asObservable();
  }

}
