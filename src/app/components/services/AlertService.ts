import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";


@Injectable({
  providedIn: 'root',
})

export class AlertService {
  private alertState = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  setValue(value: boolean) {
    this.alertState.next(value);
  }

  getValue() {
    return this.alertState.asObservable();
  }
}
