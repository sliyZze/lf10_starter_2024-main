import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditQualificationService {
  private modalState = new BehaviorSubject<boolean>(false);
  private qid: number | undefined;

  setValue(value: boolean) {
    this.modalState.next(value);
  }

  getValue() {
    return this.modalState.asObservable();
  }

  setQid(qid: number | undefined) {
    this.qid = qid;
  }

  getQid() {
    return this.qid;
  }

}
