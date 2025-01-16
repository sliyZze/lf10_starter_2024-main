import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Employee} from "../../../model/Employee";

@Injectable({
    providedIn: 'root'
})
export class EditEmployeeService {
    private modalState = new BehaviorSubject<boolean>(false);
    private employeeId: number | undefined

    setValue(value: boolean) {
        this.modalState.next(value);
    }

    getValue() {
        return this.modalState.asObservable();
    }

    setEmployeeId(employeeId: number | undefined) {
      this.employeeId = employeeId;
    }

    getEmployeeId() {
      return this.employeeId;
    }
}
