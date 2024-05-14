import { HttpClient } from '@angular/common/http';
import { Injectable, Type, inject } from '@angular/core';
import { EmployeeRequest, EmployeeResult } from '../../interfaces/employee';
import { CountryResult } from '../../interfaces/country';
import { AreaResult } from '../../interfaces/area';
import { TypeIdentificationResult } from '../../interfaces/identification';
import { Observable } from 'rxjs';
import { EmailResponse } from '../../interfaces/email';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private httpClient = inject(HttpClient);

  //EMPLEADOS
  getEmployees(): Observable<EmployeeResult> {
    return this.httpClient.get<EmployeeResult>(
      'http://localhost:8000/api/employees/'
    );
  }

  getEmployee(id: number): Observable<EmployeeResult> {
    return this.httpClient.get<EmployeeResult>(
      `http://localhost:8000/api/employees/${id}`
    );
  }

  deleteEmployee(id: number): Observable<EmployeeResult> {
    return this.httpClient.delete<EmployeeResult>(
      `http://localhost:8000/api/employees/${id}`
    );
  }

  addEmployee(employee: any): Observable<EmployeeRequest> {
    return this.httpClient.post<EmployeeRequest>(
      'http://localhost:8000/api/employees/',
      employee
    );
  }

  //VERIFICAR CORREO DUPLICADO
  checkEmailDuplicate(email: string): Observable<EmailResponse> {
    return this.httpClient.post<EmailResponse>(
      'http://localhost:8000/api/verify-email/',
      { correo_electronico: email }
    );
  }

  //PAIS
  getCountries(): Observable<CountryResult[]> {
    return this.httpClient.get<CountryResult[]>(
      'http://localhost:8000/api/countries/'
    );
  }

  //AREAS
  getAreas(): Observable<AreaResult[]> {
    return this.httpClient.get<AreaResult[]>(
      'http://localhost:8000/api/areas/'
    );
  }

  //TIPO DE IDENTIFICACIONES
  getIdentifications(): Observable<TypeIdentificationResult[]> {
    return this.httpClient.get<TypeIdentificationResult[]>(
      'http://localhost:8000/api/identifications/'
    );
  }
}
