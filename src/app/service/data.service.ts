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
  bearer = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzUFQ0dldiNno5MnlQWk1EWnBqT1U0RjFVN0lwNi1ELUlqQWVGczJPbGU0In0.eyJleHAiOjE3MzY5NTEzMDIsImlhdCI6MTczNjk0NzcwMiwianRpIjoiYzZlYzNlY2QtNzAwZC00ODBlLTg3MTgtZGUxYmQ2YjdhMjA5IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zenV0LmRldi9hdXRoL3JlYWxtcy9zenV0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU1NDZjZDIxLTk4NTQtNDMyZi1hNDY3LTRkZTNlZWRmNTg4OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVtcGxveWVlLW1hbmFnZW1lbnQtc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiJmMjMyMDRhOS05MzM0LTQxYjMtYjM0Yy00MzU2MjY3MDZkNGMiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsicHJvZHVjdF9vd25lciIsIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1zenV0IiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InVzZXIifQ.Y0PLUnBh9CLW4zjmNpocv1zPTLC6pR5QSA1Ki7vBhKzsRVKq7p1Nx14vWceytIrLf0jfdVWfqjNjnnbrhhYlT9YIfBHQFxK2jrDHTbcEMDkZ_i0df8s76tGpJU6MHppQ1PJ2sK7aUEyVRVtLbdiIJyBo8mbq9Ie5fyj1aohPXhHryFgR6cttXh06zgr7aVimv8NILTdCrYJwBlV48CldqPetQoET3ukRex05pNaANPQ6loA-ctSWHqUhb7urmVbwlIEK_ZtpQ0v80pna2TaVPGBQCPlefn-24z7O-DOX2qX_NxZ3-VeU6AdNXVu1gTAmzN8r9Xn295WsCFyD3xJXyw';
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

}
