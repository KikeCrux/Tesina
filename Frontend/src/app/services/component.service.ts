import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {
  private baseUrl = 'http://localhost:3000/api/components'; // Ruta base para el módulo de componentes

  constructor(private http: HttpClient) {}

  /**
   * Obtener los componentes de un paquete.
   * @param idPaquete ID del paquete.
   */
  getComponentsByPackage(idPaquete: number): Observable<any[]> {
    const endpoint = `${this.baseUrl}/${idPaquete}`; // "/:id_paquete"
    return this.http.get<any[]>(endpoint);
  }

  /**
   * Agregar un componente a un paquete.
   * @param component Datos del componente.
   */
  addComponentToPackage(component: {
    id_paquete: number;
    tipo_componente: string;
    nombre_componente: string;
    cantidad: number;
  }): Observable<any> {
    const endpoint = `${this.baseUrl}`;
    return this.http.post<any>(endpoint, component);
  }

  /**
   * Actualizar un componente.
   * @param idComponente ID del componente.
   * @param component Datos del componente a actualizar.
   */
  updateComponent(idComponente: number, component: {
    tipo_componente?: string;
    nombre_componente?: string;
    cantidad?: number;
  }): Observable<any> {
    const endpoint = `${this.baseUrl}/${idComponente}`; // "/:id_componente"
    return this.http.put<any>(endpoint, component);
  }

  /**
   * Eliminar un componente.
   * @param idComponente ID del componente.
   */
  deleteComponent(idComponente: number): Observable<any> {
    const endpoint = `${this.baseUrl}/${idComponente}`; // "/:id_componente"
    return this.http.delete<any>(endpoint);
  }
}
