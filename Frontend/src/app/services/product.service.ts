// producto.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/productos';

  constructor(private http: HttpClient) { }

  // Obtener los productos
  getProductos(tipoUsuario: string, idUsuario: number): Observable<Producto[]> {
    const endpoint = `${this.apiUrl}?tipo_usuario=${tipoUsuario}&id_usuario=${idUsuario}`;
    return this.http.get<Producto[]>(endpoint);
  }
}
