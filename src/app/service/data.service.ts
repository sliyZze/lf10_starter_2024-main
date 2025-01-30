import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Employee} from "../model/Employee";
import {Skill} from "../model/Skill";
import {AddEmployee} from "../model/AddEmployee";
import {AddQualification} from "../model/AddQualification";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  private EmployeeServiceURL = 'http://localhost:8089/employees';
  private qualificationsServiceURL = 'http://localhost:8089/qualifications';
  //todo keylock login nicht hier coded
  bearer = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzUFQ0dldiNno5MnlQWk1EWnBqT1U0RjFVN0lwNi1ELUlqQWVGczJPbGU0In0.eyJleHAiOjE3MzczMjA0MTgsImlhdCI6MTczNzMxNjgxOCwianRpIjoiN2M5ODVhOGYtMzkyZi00MzU5LTkxMDgtNDQxOTBkNmYwMTE4IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zenV0LmRldi9hdXRoL3JlYWxtcy9zenV0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU1NDZjZDIxLTk4NTQtNDMyZi1hNDY3LTRkZTNlZWRmNTg4OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVtcGxveWVlLW1hbmFnZW1lbnQtc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiIyNDg0Y2RkYS0zNmU1LTRkYmMtOThlZC0wMTNhNTljMzhhNTIiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsicHJvZHVjdF9vd25lciIsIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1zenV0IiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InVzZXIifQ.ePQCcrzqXYwIwykmSdQq07tRqI8Q-mCHtZpiRgD8az9OY66BDMH6zgfkmCxD54wFUJPAR5_LCcZb_a5O4qp0q7IfmEyc4nDHIZlHi7TzeaX4fk2D1QHbkpvXtfLj28oxEw9U_4SYLwQ8hhzwoKoXFxmJX6OOg5btot9TGy-V2LHrbeu0YIrzHNhxyDermbQI3lkwdChvFAbbjwlurbd0zAynLxiTXntayrSzgxWfV7hkJdVvP9E4f1nYECS--jU7CCAZHMyr9jEo6TjMbrHoEfKGgFGeGf5WOzdPevAR5Q32rl0QM7PBD9kXidFtnCf09VX6I6QnpombcX9oLgc9rQ';
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

    addEmployee(employee: AddEmployee): Observable<void>{
    return this.http.post<void>(this.EmployeeServiceURL, employee, this.HttpHeader).pipe(
      catchError((error) => {
        console.log("Fehler beim Hinzufügen des Mitarbeiters")
        return throwError(() => error);
      })
    );
  }

  updateEmployee(employee: AddEmployee): Observable<void> {
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

  getQualifications(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.qualificationsServiceURL, this.HttpHeader).pipe(
      catchError((error) => {
        console.error('Fehler beim Abrufen der Qualificationen:', error);
        return throwError(() => error);
      })
    );
  }

  addQualification(addQualification: AddQualification): Observable<void> {
      return this.http.post<void>(this.qualificationsServiceURL, addQualification, this.HttpHeader).pipe(
          catchError((error) => {
              console.error('Fehler beim Hinzufügen der Qualification:', error);
              return throwError(() => error);
          })
      );
  }

    deleteQualification(id: number | undefined): Observable<void> {
        if (!id) {
            return throwError(() => new Error('Ungültige ID.'));
        }

        return this.http.delete<void>(`${this.qualificationsServiceURL}/${id}`, this.HttpHeader).pipe(
            catchError((error) => {
                console.error('Fehler beim Hinzufügen der Qualification:', error);
                return throwError(() => error);
            })
        );
    }

}
