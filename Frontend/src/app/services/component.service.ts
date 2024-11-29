import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Componente } from '../models/componentes'; // Importa el modelo correctamente

@Injectable({
  providedIn: 'root',
})
export class ComponentService {
  private baseUrl = 'http://localhost:3000/api/components'; // URL base de la API

  constructor(private http: HttpClient) {}

 // Obtener todos los componentes
 getAllComponents(): Observable<Componente[]> {
  return this.http.get<Componente[]>(`${this.baseUrl}/all`);
}

  // Obtener componentes por paquete
  getComponentsByPackage(idPaquete: number): Observable<Componente[]> {
    return this.http.get<Componente[]>(`${this.baseUrl}/${idPaquete}`);
  }

  // Agregar componente
  addComponentToPackage(componente: Componente): Observable<Componente> {
    return this.http.post<Componente>(this.baseUrl, componente);
  }

  // Actualizar componente
  updateComponent(
    idComponente: number,
    componente: Partial<Componente>
  ): Observable<any> {
    return this.http.put(`${this.baseUrl}/${idComponente}`, componente);
  }

  // Eliminar componente
  deleteComponent(idComponente: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${idComponente}`);
  }
}
