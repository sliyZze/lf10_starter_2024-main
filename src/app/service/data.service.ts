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
  //todo keylock login nicht hier coded
  bearer = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzUFQ0dldiNno5MnlQWk1EWnBqT1U0RjFVN0lwNi1ELUlqQWVGczJPbGU0In0.eyJleHAiOjE3MzczMDk3MjYsImlhdCI6MTczNzMwNjEyNiwianRpIjoiNjhkYmExYzMtOGY0ZS00YmFmLTg2NmEtZGU2OWYzODg1MzRmIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zenV0LmRldi9hdXRoL3JlYWxtcy9zenV0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU1NDZjZDIxLTk4NTQtNDMyZi1hNDY3LTRkZTNlZWRmNTg4OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVtcGxveWVlLW1hbmFnZW1lbnQtc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiIwNWY4MzBlMi04N2NlLTQxNjctOGI5Yy00M2Q5MDQ2ZDNmOWYiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsicHJvZHVjdF9vd25lciIsIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1zenV0IiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InVzZXIifQ.IKZl4U0PYw59uQlcWxgqgKYaXfJ95IspmMCYtOrTJzFts-6_BPh09jD5tDZxxoeiDhbSecA_YDjmoDhCSw-fLN3G_TMdoj9cQXUxM8um6cYTLca5tUfOiH4xHvYytfwWp1cxefm4QIPx6ieNL8HnDCWxtZWkXKE28uISlqEk3WMP5VxGJL7VbWVVW8kdZm-986NrzaKsoSomVtUkE2LfHPlEjR9EV9rEjrs_9rwTBwNLl20X4a4qDTmN_m1aAZJriHyR8A04jXDUp1l_52NqjQ2EpBcaIuTKu2AM9y5YyDzrZARPLt97Ciij9iDDhdAa0OVDIji9jaTmwdJ8K8ppoA';
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
    return this.http.patch<void>(`${this.EmployeeServiceURL}/${employee.id}`, employee, this.HttpHeader).pipe(
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
