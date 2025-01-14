import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'https://retoolapi.dev/HYd96h/data';

  constructor(private http: HttpClient) {}
  //fetch the list of empoyees
  fetchEmployees(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching employees', error);
        return of([]);
      })
    );
  }
}

