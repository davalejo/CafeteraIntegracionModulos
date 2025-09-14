import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/v1/auth'; // base del backend

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
    tap((res: any) => {
      if (res.token) {
        localStorage.setItem('token', res.token);
          console.debug('[AuthService] Token guardado en LocalStorage');
        }
      })
    );
  }

  register(data: { nombre: string; correo: string; password: string }): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/register`, data).pipe(
      tap((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          console.debug('[AuthService] Token guardado en LocalStorage');
        }
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

    // Cerrar sesión
  logout() {
    localStorage.removeItem('token');
  }

  // Verificar sesión activa
  isLogged(): boolean {
    return !!this.getToken();
  }
  
}