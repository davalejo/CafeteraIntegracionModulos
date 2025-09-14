import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PedidosService {
  private apiUrl = 'http://localhost:3000/api/v1/pedidos';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  create(pedido: any): Observable<any> {
    return this.http.post(this.apiUrl, pedido);
  }

  update(id: string, pedido: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, pedido);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}