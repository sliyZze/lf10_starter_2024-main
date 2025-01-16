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
  bearer = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzUFQ0dldiNno5MnlQWk1EWnBqT1U0RjFVN0lwNi1ELUlqQWVGczJPbGU0In0.eyJleHAiOjE3MzcwMjE2OTcsImlhdCI6MTczNzAxODA5NywianRpIjoiNDhjZGExYmItN2ZkNC00MmEyLTkyYzgtNDBkODQzZDZlZDBmIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zenV0LmRldi9hdXRoL3JlYWxtcy9zenV0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU1NDZjZDIxLTk4NTQtNDMyZi1hNDY3LTRkZTNlZWRmNTg4OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVtcGxveWVlLW1hbmFnZW1lbnQtc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiI4ZmI5NmIxMi1kMzc2LTQxN2UtYWY4Yi00MzcxMzJmODkyZDQiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsicHJvZHVjdF9vd25lciIsIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1zenV0IiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InVzZXIifQ.Fbh1PvVSkeRSi9nkDmKs0grE99OkrEEbLG8xtn_l_DIvNZS2vX9vd3-lLev-WYOeCdppLeUifQSPy4XQB8cNmGSYnvX2izYMPosIFIkK6V_IJ-uWkUEbfbJJyUkN7NV6c-TnJGRQDYy3TKEl8Fz6J5e_x2lDUAPqokr7BrJQJDICoZZ6JKCwh176xQYKtCs4DPS9QAMbQBy1MesFUUbbUs77ObZS9J_rwcmV-Esn_4aE1WYSFgdX5IDkUVzOlUCxghEcd4DCR60xiUemD2DsXqo-cnXAPiR_KPRtuMYDEPoSSD2sAJQbE8ViRnaHEjI1YJmN9wzFODnz0nsZSfxd9Q';
  private HttpHeader = {
    headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.bearer}`)
  }

  getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.EmployeeServiceURL, this.HttpHeader);
  }

  getEmployee(id: number): Observable<Employee>{
    return this.http.get<Employee>(`${this.EmployeeServiceURL}/${id}`, this.HttpHeader);
  }

  deleteEmployee(id: number | undefined): Observable<void>{
    return this.http.delete<void>(`${this.EmployeeServiceURL}/${id}`, this.HttpHeader);
  }

  addEmployee(employee: Employee): Observable<void>{
    return this.http.post<void>(this.EmployeeServiceURL, employee, this.HttpHeader);
  }

  updateEmployee(employee: Employee): Observable<void>{
    return this.http.patch<void>(this.EmployeeServiceURL, employee, this.HttpHeader);
  }

}
