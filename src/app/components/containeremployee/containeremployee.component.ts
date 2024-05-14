import { Component } from '@angular/core';
import { Employee, EmployeeResult } from '../../interfaces/employee';
import { ApiService } from '../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { ModaleditComponent } from '../modaledit/modaledit.component';
import { ModaladdComponent } from '../modaladd/modaladd.component';
import { ModaldeleteComponent } from '../modaldelete/modaldelete.component';

@Component({
  selector: 'app-containeremployee',
  standalone: true,
  imports: [
    CommonModule,
    ModaleditComponent,
    ModaladdComponent,
    ModaldeleteComponent,
  ],
  templateUrl: './containeremployee.component.html',
})
export class ContaineremployeeComponent {
  headers: string[] = [
    'ID',
    'Primer Nombre',
    'Otros Nombres',
    'Primer Apellido',
    'Segundo Apellido',
    'Tipo de Identificación',
    'Número de Identificación',
    'País del empleo',
    'Correo electrónico',
    'Estado',
  ];

  employees: Employee[] = [];
  modalestadoagregar: boolean = false;
  modalestadoeditar: boolean = false;
  modalestadoeliminar: boolean = false;
  idEmployee: number = 0;
  isLoading: boolean = false;

  constructor(private apiService: ApiService) {}

  getAllEmployees() {
    this.isLoading = true;
    this.apiService.getEmployees().subscribe((data: EmployeeResult) => {
      this.employees = data.data;
    });
    this.isLoading = false;
  }

  capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  abrirModalAgregar() {
    this.modalestadoagregar = true;
  }

  cerrarModalAgregar($event: boolean) {
    this.modalestadoagregar = false;
  }

  abrirModalEditar(id: number) {
    this.idEmployee = id;
    this.modalestadoeditar = true;
  }

  cerrarModalEditar($event: boolean) {
    this.modalestadoeditar = false;
  }

  abrirModalEliminar(id: number) {
    this.idEmployee = id;
    this.modalestadoeliminar = true;
  }

  cerrarModalEliminar($event: boolean) {
    this.modalestadoeliminar = false;
  }
}
