import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QualificationTargetService {
  private modalState = new BehaviorSubject<string>("Mitarbeitertabelle");

  setValue(value: string) {
    this.modalState.next(value);
  }

  getValue() {
    return this.modalState.value;
  }
}
