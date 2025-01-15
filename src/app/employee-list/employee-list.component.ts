import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Employee} from "../model/Employee";
import {MainViewComponent} from "../components/main-view-component/main-view-component";

@Component({
    selector: 'app-employee-list',
    imports: [CommonModule, MainViewComponent],
    templateUrl: './employee-list.component.html',
    styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  bearer = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzUFQ0dldiNno5MnlQWk1EWnBqT1U0RjFVN0lwNi1ELUlqQWVGczJPbGU0In0.eyJleHAiOjE3MzY5MzA3NDYsImlhdCI6MTczNjkyNzE0NiwianRpIjoiNGJhOWFiNDYtNTFjMy00ZGRjLTg5NjMtMTU3NDcyYjc0ZjcxIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zenV0LmRldi9hdXRoL3JlYWxtcy9zenV0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU1NDZjZDIxLTk4NTQtNDMyZi1hNDY3LTRkZTNlZWRmNTg4OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVtcGxveWVlLW1hbmFnZW1lbnQtc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiI1MGJiZDA4ZC03ZWU0LTQ5ZDEtODE0ZC1lOTY4ODdlMzRkY2YiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsicHJvZHVjdF9vd25lciIsIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1zenV0IiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InVzZXIifQ.AsfA3dLNPQXC3SMS1zNK8kmBo88c9LbiCm3Oey5V7SrImV7tG0Br_i-qmxQCTQUtSFumt_Ba8Ov9-DkVIDUM60WtPlNQA62hK7XAwQ2yGA8v7OWtGgh9t6IFCS5EspPx5RbjB6kTLG40s13pG9aNoTi6V0jY2r-cVqyTy2IHWblYbLxDbA8zSFcYux50NhGo7rN94U3MjgR3-y8qH3xFphjJ49WBFg6k2CogC3a38VEdA3rGqxPARKLelyLe4W7bTuHucDmLndJ-Cl3S0x5AqNO3Hs4bjrBBBA7zC3PNcJl20OWVFS1A4dcwAqcehXyDdJ5LZmVVw-ZTjiNeaFSkbg';
  employees$: Observable<Employee[]>;

  constructor(private http: HttpClient) {
    this.employees$ = of([]);
    this.fetchData();
  }

  fetchData() {
    this.employees$ = this.http.get<Employee[]>('http://localhost:8089/employees', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer}`)
    });
  }
}
