import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PedidosService } from '../../../core/services/pedidos.service';

@Component({
  selector: 'app-pedidos-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pedidos-form.component.html',
  styleUrls: ['./pedidos-form.component.scss']
})
export class PedidosFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private pedidosService: PedidosService) {
    this.form = this.fb.group({
      producto: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.pedidosService.create(this.form.value).subscribe({
        next: () => alert('Pedido registrado exitosamente'),
        error: () => alert('Error al registrar pedido')
      });
    }
  }
}