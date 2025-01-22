import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Employee} from "../../model/Employee";
import {AddEmployee} from "../../model/AddEmployee";

@Injectable({
  providedIn: 'root'
})
export class AddQualificationService {
  private modalState = new BehaviorSubject<boolean>(false);
  private employee!: AddEmployee;

  setValue(value: boolean) {
    this.modalState.next(value);
  }

  getValue() {
    return this.modalState.asObservable();
  }

  setEmployee(employee: AddEmployee) {
    this.employee = employee;
  }

  getEmployee(){
    return this.employee;
  }

}
