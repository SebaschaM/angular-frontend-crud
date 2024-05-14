import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ModaleditComponent } from '../modaledit/modaledit.component';
import { CommonModule } from '@angular/common';
import { EmployeeRequest } from '../../interfaces/employee';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-modaladd',
  standalone: true,
  imports: [CommonModule, ModaleditComponent, ReactiveFormsModule],
  templateUrl: './modaladd.component.html',
})
export class ModaladdComponent {
  @Output() modalCerrado: EventEmitter<boolean> = new EventEmitter<boolean>();
  formularioEmpleado: FormGroup;
  isActive: boolean = true;
  isLoading: boolean = false;
  isDuplicateEmail: boolean = false;
  isNeedIdEmail: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {
    this.formularioEmpleado = this.formBuilder.group({
      primer_apellido: ['', [Validators.required, Validators.maxLength(20)]],
      segundo_apellido: ['', [Validators.required, Validators.maxLength(20)]],
      primer_nombre: ['', [Validators.required, Validators.maxLength(20)]],
      otros_nombres: ['', [Validators.required, Validators.maxLength(50)]],
      fecha_ingreso: ['', Validators.required],
      area_id: ['', Validators.required],
      country_id: ['', Validators.required],
      identification_id: ['', Validators.required],
      numero_identificacion: [
        '',
        [Validators.required, Validators.maxLength(20)],
      ],
    });
  }

  cerrarModalAgregar() {
    this.modalCerrado.emit(true);
  }

  checkDuplicateEmail(correo_electronico: string) {
    this.apiService.checkEmailDuplicate(correo_electronico).subscribe(
      (data) => {
        if (data.duplicate === 'true') {
          // Si el correo electrónico ya existe, generar uno nuevo con un ID adicional secuencial
          const newEmail = this.generateUniqueEmail(correo_electronico);
          // Llamar a la función agregarEmpleado con el nuevo correo electrónico generado
          this.agregarEmpleado(newEmail);
        } else {
          // Si el correo electrónico no está duplicado, llamar directamente a agregarEmpleado
          this.agregarEmpleado(correo_electronico);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  generateUniqueEmail(correo_electronico: string): string {
    const [nombre, dominio] = correo_electronico.split('@');
    const [primerNombre, primerApellido] = nombre.split('.');
    let id = 0;
    const lastIndex = primerApellido.lastIndexOf('.');
    if (lastIndex !== -1) {
      const lastPart = primerApellido.substring(lastIndex + 1);
      if (!isNaN(parseInt(lastPart))) {
        id = parseInt(lastPart) + 1;
      }
    }
    const newEmail = `${primerNombre}.${primerApellido}.${id}@${dominio}`;
    return newEmail;
  }

  agregarEmpleado(correoElectronico: string) {
    this.isLoading = true;
    const data = {
      ...this.formularioEmpleado.value,
      area_id: parseInt(this.formularioEmpleado.value.area_id),
      country_id: parseInt(this.formularioEmpleado.value.country_id),
      identification_id: parseInt(
        this.formularioEmpleado.value.identification_id
      ),
      estado: 'ACTIVO',
      correo_electronico: correoElectronico,
    };

    this.apiService.addEmployee(data).subscribe(
      (data) => {
        this.isLoading = false;
        this.modalCerrado.emit(true);
        window.location.reload();
      },
      (error) => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }

  validarFormulario() {
    if (this.formularioEmpleado.valid) {
      const correoElectronico = this.generarCorreoElectronico(
        this.formularioEmpleado.value.primer_nombre,
        this.formularioEmpleado.value.primer_apellido,
        this.formularioEmpleado.value.country_id
      );

      const data = {
        ...this.formularioEmpleado.value,
        area_id: parseInt(this.formularioEmpleado.value.area_id),
        country_id: parseInt(this.formularioEmpleado.value.country_id),
        identification_id: parseInt(
          this.formularioEmpleado.value.identification_id
        ),
        estado: 'ACTIVO',
        correo_electronico: correoElectronico,
      };

      this.checkDuplicateEmail(correoElectronico);
    } else {
      Object.values(this.formularioEmpleado.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }

  generarCorreoElectronico(
    primerNombre: string,
    primerApellido: string,
    countryId: string
  ): string {
    const dominio = countryId === '1' ? 'global.com.co' : 'global.com.us';
    const correo = `${primerNombre.toLowerCase()}.${primerApellido.toLowerCase()}@${dominio}`;
    return correo;
  }
}
