import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Skill} from "../../model/Skill";

@Injectable({
  providedIn: 'root'
})
export class CreateQualificationService {
  private modalState = new BehaviorSubject<boolean>(false);
  private savedQualificationsSubject = new BehaviorSubject<Skill[]>([]);
  savedQualifications$ = this.savedQualificationsSubject.asObservable();

  setValue(value: boolean) {
    this.modalState.next(value);
  }

  getValue() {
    return this.modalState.asObservable();
  }

  updateSavedQualifications(qualifications: Skill[]) {
    this.savedQualificationsSubject.next(qualifications);
  }
}
