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
      'https://laravel-backend-crud-production.up.railway.app/api/employees/'
    );
  }

  getEmployee(id: number): Observable<EmployeeResult> {
    return this.httpClient.get<EmployeeResult>(
      `https://laravel-backend-crud-production.up.railway.app/api/employees/${id}`
    );
  }

  deleteEmployee(id: number): Observable<EmployeeResult> {
    return this.httpClient.delete<EmployeeResult>(
      `https://laravel-backend-crud-production.up.railway.app/api/employees/${id}`
    );
  }

  addEmployee(employee: any): Observable<EmployeeRequest> {
    return this.httpClient.post<EmployeeRequest>(
      'https://laravel-backend-crud-production.up.railway.app/api/employees/',
      employee
    );
  }

  //VERIFICAR CORREO DUPLICADO
  checkEmailDuplicate(email: string): Observable<EmailResponse> {
    return this.httpClient.post<EmailResponse>(
      'https://laravel-backend-crud-production.up.railway.app/api/verify-email/',
      { correo_electronico: email }
    );
  }

  //PAIS
  getCountries(): Observable<CountryResult[]> {
    return this.httpClient.get<CountryResult[]>(
      'https://laravel-backend-crud-production.up.railway.app/api/countries/'
    );
  }

  //AREAS
  getAreas(): Observable<AreaResult[]> {
    return this.httpClient.get<AreaResult[]>(
      'https://laravel-backend-crud-production.up.railway.app/api/areas/'
    );
  }

  //TIPO DE IDENTIFICACIONES
  getIdentifications(): Observable<TypeIdentificationResult[]> {
    return this.httpClient.get<TypeIdentificationResult[]>(
      'https://laravel-backend-crud-production.up.railway.app/api/identifications/'
    );
  }
}
