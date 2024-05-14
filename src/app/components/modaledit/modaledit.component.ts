import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import {
  Employee,
  EmployeeResult,
  EmployeeResultId,
} from '../../interfaces/employee';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-modaledit',
  standalone: true,
  imports: [CommonModule, ModaleditComponent, ReactiveFormsModule],
  templateUrl: './modaledit.component.html',
})
export class ModaleditComponent {
  @Output() modalCerrado: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() idEmployee: number = 0;
  formularioEmpleado: FormGroup;
  employeeData: Employee = {} as Employee;
  isLoading: boolean = false;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) {
    this.formularioEmpleado = this.formBuilder.group({
      primerApellido: ['', [Validators.required, Validators.maxLength(20)]],
      segundoApellido: ['', [Validators.required, Validators.maxLength(20)]],
      primerNombre: ['', [Validators.required, Validators.maxLength(20)]],
      otrosNombres: ['', [Validators.required, Validators.maxLength(50)]],
      fechaIngreso: ['', Validators.required],
      areaId: ['', Validators.required],
      countryId: ['', Validators.required],
      identificationId: ['', Validators.required],
      numero_identificacion: [
        '',
        [Validators.required, Validators.maxLength(20)],
      ],
    });
  }

  cerrarModalEditar() {
    this.modalCerrado.emit(true);
  }

  getEmployeeId() {
    this.isLoading = true;
    this.apiService.getEmployee(this.idEmployee).subscribe(
      (data: any) => {
        this.employeeData = data.data;
        this.formularioEmpleado.patchValue({
          primerApellido: this.employeeData.primer_apellido,
          segundoApellido: this.employeeData.segundo_apellido,
          primerNombre: this.employeeData.primer_nombre,
          otrosNombres: this.employeeData.otros_nombres,
          fechaIngreso: this.employeeData.fecha_ingreso.split(' ')[0],
          areaId: this.employeeData.area_id,
          countryId: this.employeeData.country_id,
          identificationId: this.employeeData.identification_id,
          numero_identificacion: this.employeeData.numero_identificacion,
        });
      },
      (error) => {
        console.error(error);
      }
    );
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.getEmployeeId();
  }

  actualizarEmpleado() {
    console.log(this.employeeData);
  }
}
