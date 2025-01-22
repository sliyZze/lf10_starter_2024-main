import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Employee} from "../model/Employee";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  private EmployeeServiceURL = 'http://localhost:8089/employees';
  bearer = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzUFQ0dldiNno5MnlQWk1EWnBqT1U0RjFVN0lwNi1ELUlqQWVGczJPbGU0In0.eyJleHAiOjE3MzczMjQxMzUsImlhdCI6MTczNzMyMDUzNSwianRpIjoiNjYwZGJkZmEtMDcwMi00ZWY4LWIxOGEtMjJjMjllM2FmMTVmIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zenV0LmRldi9hdXRoL3JlYWxtcy9zenV0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU1NDZjZDIxLTk4NTQtNDMyZi1hNDY3LTRkZTNlZWRmNTg4OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVtcGxveWVlLW1hbmFnZW1lbnQtc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiI4ODk4MzhjMS1lN2Y0LTQ5MjEtYTBkMC02NGM5MzBmYzM2NjIiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsicHJvZHVjdF9vd25lciIsIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1zenV0IiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InVzZXIifQ.TfeNz41FzTES7kKYHHh1RvL3W_LOtbIrVc2FUfUX_70wY640p5wNCeTXN4DdZQQ8gJt_lYeCz1SzBw2R2CC0NXKop6hWianW5PBhRmoqjm1MXTuQyQ_ZXgKFSMb6ohigzVMOn9bC0-G6Dblg_a17qAYfWLhml7khbCIyxtcOBewF-XEcpKfDy2L6NyxX0VUycXFC_kowf9LXe4XjLeq6qbq-hBjpsXtjAk0Mc2V8jvhyu-Q8SmiMAWdKSHcPdU39JWbNPt-LFQAAQk6Ht53C3TwhQjt1Bp1AsXdZllXGGjEF2GF_Ieo6oC-6BlmgvtbHvLbL7eU--d7E3aBZBaukOQ';
  private HttpHeader = {
    headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.bearer}`)
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.EmployeeServiceURL, this.HttpHeader).pipe(
      catchError((error) => {
        console.error('Fehler beim Abrufen der Mitarbeiterdaten:', error);
        return throwError(() => error);
      })
    );
  }

  getEmployee(id: number | undefined): Observable<Employee>{
    return this.http.get<Employee>(`${this.EmployeeServiceURL}/${id}`, this.HttpHeader).pipe(
      catchError((error) => {
        console.log("Fehler beim Abrufen des Mitarbeiters")
        return throwError(() => error);
      })
    );
  }

  deleteEmployee(id: number | undefined): Observable<void>{
    return this.http.delete<void>(`${this.EmployeeServiceURL}/${id}`, this.HttpHeader).pipe(
      catchError((error) => {
        console.log("Fehler beim Löschen des Mitarbeiters")
        return throwError(() => error);
      })
    );
  }

  addEmployee(employee: Employee): Observable<void>{
    return this.http.post<void>(this.EmployeeServiceURL, employee, this.HttpHeader).pipe(
      catchError((error) => {
        console.log("Fehler beim Hinzufügen des Mitarbeiters")
        return throwError(() => error);
      })
    );
  }

  updateEmployee(employee: Employee): Observable<void> {
    return this.http.put<void>(`${this.EmployeeServiceURL}/${employee.id}`, employee, this.HttpHeader).pipe(
      catchError((error) => {
        console.log("Fehler beim Aktualisieren des Mitarbeiters")
        return throwError(() => error);
      })
    );
  }


  deleteQualificationFromEmployee(eid: number | undefined, qid: number | undefined): Observable<void>{
    return this.http.delete<void>(`${this.EmployeeServiceURL}/${eid}/qualifications/${qid}`, this.HttpHeader).pipe(
      catchError((error) => {
        console.log("Fehler beim Löschen der Mitarbeiterqualifikation")
        return throwError(() => error);
      })
    );
  }

}
