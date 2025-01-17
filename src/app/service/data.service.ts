import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HttpParams} from '@angular/common/http';
import {filter, map, mergeMap, Observable, toArray} from 'rxjs';
import {Employee} from "../model/Employee";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  private EmployeeServiceURL = 'http://localhost:8089/employees';
  //todo keylock login nicht nicht hier coded
  bearer = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzUFQ0dldiNno5MnlQWk1EWnBqT1U0RjFVN0lwNi1ELUlqQWVGczJPbGU0In0.eyJleHAiOjE3MzcxNDAwNjAsImlhdCI6MTczNzEzNjQ2MCwianRpIjoiMmRhNWVkNTEtMDlkZC00NzgwLWJjNTktMWZkNzRlODBhZWQ0IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zenV0LmRldi9hdXRoL3JlYWxtcy9zenV0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU1NDZjZDIxLTk4NTQtNDMyZi1hNDY3LTRkZTNlZWRmNTg4OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVtcGxveWVlLW1hbmFnZW1lbnQtc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiJkNDg2Y2VjMC02ZWZkLTQzN2YtYTYxMi1kZDE2MjdlYTczNmYiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsicHJvZHVjdF9vd25lciIsIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1zenV0IiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InVzZXIifQ.G6kwcuL7u4nUMvRyHK9CnR32WAG7Kj2_IASf69OkqOGUr4xge593KeanZwUr7i2MpZdgxUXjtt9FxFadZU6INESAS3b1M_s7TV-asHC1xoqK65CpMCx-SNHl-iGu-O_V0JwGUPZBRTdIfonp9TmLtZh-hDfuC9jLT1N_5CAerrKOLGxYOv1IeP6S3x6tI_voj3FOIz1meIukqN3i0LnNUAwnH_VobWx7bBdGqKzHVzy6C0t8KMnym44jdXaXx6QDmFfxIqOJ6UeSoanjif4VYRKxg_-pH7TaJVR1ZyNw99CMnaZQPMa5LXSlbCeh8c_Pd0jtZa407m9SW3Y-ab29nQ';
  private HttpHeader = {
    headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.bearer}`)
  }

  getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.EmployeeServiceURL, this.HttpHeader);
  }

  getEmployee(id: number | undefined): Observable<Employee>{
    return this.http.get<Employee>(`${this.EmployeeServiceURL}/${id}`, this.HttpHeader);
  }

  deleteEmployee(id: number | undefined): Observable<void>{
    return this.http.delete<void>(`${this.EmployeeServiceURL}/${id}`, this.HttpHeader);
  }

  addEmployee(employee: Employee): Observable<void>{
    return this.http.post<void>(this.EmployeeServiceURL, employee, this.HttpHeader);
  }

  updateEmployee(employee: Employee): Observable<void>{
    return this.http.patch<void>(`${this.EmployeeServiceURL}/${employee.id}`, this.HttpHeader);
  }

  deleteQualificationFromEmployee(eid: number | undefined, qid: number | undefined): Observable<void>{
    return this.http.delete<void>(`${this.EmployeeServiceURL}/${eid}/qualifications/${qid}`, this.HttpHeader);
  }

}
