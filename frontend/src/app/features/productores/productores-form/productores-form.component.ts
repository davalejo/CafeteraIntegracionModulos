import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductoresService } from '../../../core/services/productores.service';

@Component({
  selector: 'app-productor-form',
  standalone: true, // 🔑 Aseguramos standalone
  imports: [CommonModule, ReactiveFormsModule], // 🔑 Importar formularios y directivas básicas
  templateUrl: './productores-form.component.html'
})
export class ProductoresFormComponent implements OnInit {
  form!: FormGroup;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productoresService: ProductoresService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.productoresService.create(this.form.value).subscribe({
        next: () => this.router.navigate(['/productores']),
        error: (err) => {
          console.error('Error al crear productor', err);
          this.error = 'Error al crear productor';
        }
      });
    }
  }
}