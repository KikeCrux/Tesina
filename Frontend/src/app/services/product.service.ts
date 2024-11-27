import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getProductos(tipoUsuario: string, idUsuario?: number): Observable<Producto[]> {
    const endpoint = `${this.baseUrl}/products/productos`; // Ajuste aquí
    const params = { tipo_usuario: tipoUsuario, id_usuario: idUsuario?.toString() || '' };
    return this.http.get<Producto[]>(endpoint, { params });
  }
}
