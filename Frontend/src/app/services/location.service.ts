import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '../models/location'; // Importa el modelo
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private baseUrl = 'http://localhost:3000/api/locations';

  constructor(private http: HttpClient) {}

  /**
   * Obtener ubicaciones
   * @param idUsuario ID del usuario (opcional).
   */
  getLocations(idUsuario?: number): Observable<Location[]> {
    let params = new HttpParams(); // Crear instancia de HttpParams
    if (idUsuario) {
      params = params.set('id_usuario', idUsuario.toString()); // Agregar parámetros
    }
    return this.http.get<Location[]>(this.baseUrl, { params }); // Pasar los parámetros
  }
  

  /**
   * Crear una nueva ubicación
   * @param location Datos de la nueva ubicación.
   */
  createLocation(location: Location): Observable<any> {
    return this.http.post<any>(this.baseUrl, location);
  }

  /**
   * Actualizar una ubicación existente
   * @param idUbicacion ID de la ubicación.
   * @param location Datos actualizados de la ubicación.
   */
  updateLocation(idUbicacion: number, location: Partial<Location>): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${idUbicacion}`, location);
  }

  /**
   * Eliminar una ubicación
   * @param idUbicacion ID de la ubicación.
   */
  deleteLocation(idUbicacion: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${idUbicacion}`);
  }
}
