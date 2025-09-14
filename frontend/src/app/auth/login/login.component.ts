import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  error: string | null = null;

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.form = this.fb.group({
      correo: ['', [Validators.required, Validators.email]], // 👈 debe existir
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.auth.login(this.form.value).subscribe({
        next: () => console.log('Login exitoso'),
        error: (err) => this.error = err.error?.message || 'Error al iniciar sesión'
      });
    }
  }
}