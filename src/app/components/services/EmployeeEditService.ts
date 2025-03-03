import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


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
}
