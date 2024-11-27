import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface WholesaleClient {
  id_cliente_mayoreo?: number; // Opcional porque no se envía al crear
  id_usuario: number;
  nombre_negocio: string;
}

@Injectable({
  providedIn: 'root'
})
export class WholesaleClientService {
  private baseUrl = 'http://localhost:3000/api/wholesale-clients';

  constructor(private http: HttpClient) {}

  /**
   * Obtener todos los clientes de mayoreo.
   */
  getWholesaleClients(): Observable<WholesaleClient[]> {
    return this.http.get<WholesaleClient[]>(`${this.baseUrl}/clientes-mayoreo`);
  }

  /**
   * Crear un cliente de mayoreo.
   * @param client Datos del cliente a crear.
   */
  createWholesaleClient(client: WholesaleClient): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/clientes-mayoreo`, client);
  }

  /**
   * Actualizar un cliente de mayoreo.
   * @param idClienteMayoreo ID del cliente a actualizar.
   * @param client Datos actualizados del cliente.
   */
  updateWholesaleClient(idClienteMayoreo: number, client: WholesaleClient): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/clientes-mayoreo/${idClienteMayoreo}`, client);
  }

  /**
   * Eliminar un cliente de mayoreo.
   * @param idClienteMayoreo ID del cliente a eliminar.
   */
  deleteWholesaleClient(idClienteMayoreo: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/clientes-mayoreo/${idClienteMayoreo}`);
  }
}
