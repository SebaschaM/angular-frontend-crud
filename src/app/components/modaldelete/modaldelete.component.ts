import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-modaldelete',
  standalone: true,
  imports: [CommonModule, ModaldeleteComponent],
  templateUrl: './modaldelete.component.html',
})
export class ModaldeleteComponent {
  @Output() modalCerrado: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() idEmployee: number = 0;
  isLoading: boolean = false;

  constructor(private apiService: ApiService) {}

  cerrarModalEliminar() {
    this.modalCerrado.emit(true);
  }

  eliminarElemento() {
    this.isLoading = true;
    this.apiService.deleteEmployee(this.idEmployee).subscribe(
      (data: any) => {
        this.isLoading = false;
        this.modalCerrado.emit(true);
        window.location.reload();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
