import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Package } from '../models/package';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  /**
   * Obtener todos los paquetes.
   */
  getPackages(): Observable<Package[]> {
    const endpoint = `${this.baseUrl}/packages`;
    return this.http.get<Package[]>(endpoint);
  }

  /**
   * Crear un nuevo paquete.
   * @param nuevoPaquete Datos del paquete a crear.
   */
  createPackage(nuevoPaquete: Package): Observable<any> {
    const endpoint = `${this.baseUrl}/packages`;
    return this.http.post<any>(endpoint, nuevoPaquete);
  }

  /**
   * Actualizar un paquete existente.
   * @param idPaquete ID del paquete a actualizar.
   * @param paquete Datos actualizados del paquete.
   */
  updatePackage(idPaquete: number, paquete: Partial<Package>): Observable<any> {
    const endpoint = `${this.baseUrl}/packages/${idPaquete}`;
    return this.http.put<any>(endpoint, paquete);
  }

  /**
   * Eliminar un paquete.
   * @param idPaquete ID del paquete a eliminar.
   */
  deletePackage(idPaquete: number): Observable<any> {
    const endpoint = `${this.baseUrl}/packages/${idPaquete}`;
    return this.http.delete<any>(endpoint);
  }
}
