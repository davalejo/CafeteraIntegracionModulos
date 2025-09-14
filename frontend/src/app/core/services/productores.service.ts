import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Productor {
  _id?: string;
  nombre: string;
  correo: string;
  telefono: string;
}

@Injectable({ providedIn: 'root' })
export class ProductoresService {
  private apiUrl = 'http://localhost:3000/api/v1/productores';

  constructor(private http: HttpClient) {}

  // Obtener lista de productores
  getAll(): Observable<Productor[]> {
    return this.http.get<Productor[]>(this.apiUrl);
  }

  // Crear productor
  create(productor: Productor): Observable<Productor> {
    return this.http.post<Productor>(this.apiUrl, productor);
  }

  // Obtener un productor por ID
  getById(id: string): Observable<Productor> {
    return this.http.get<Productor>(`${this.apiUrl}/${id}`);
  }

  // Actualizar productor
  update(id: string, productor: Productor): Observable<Productor> {
    return this.http.put<Productor>(`${this.apiUrl}/${id}`, productor);
  }

  // Eliminar productor
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}