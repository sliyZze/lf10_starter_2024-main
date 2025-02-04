import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateQualificationService {
  private modalState = new BehaviorSubject<boolean>(false);
  private savedQualificationsSubject = new BehaviorSubject<number[]>([]);
  savedQualifications$ = this.savedQualificationsSubject.asObservable();

  setValue(value: boolean) {
    this.modalState.next(value);
  }

  getValue() {
    return this.modalState.asObservable();
  }

  updateSavedQualifications(qualifications: number[]) {
    const currentQualifications = this.savedQualificationsSubject.value;
    this.savedQualificationsSubject.next([...currentQualifications, ...qualifications]);
  }
}
