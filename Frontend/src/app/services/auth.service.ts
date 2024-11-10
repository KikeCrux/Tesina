import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { Usuario, UsuarioRegistro } from '../models/usuario';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';
  private tokenKey = 'authToken';

  // BehaviorSubject para gestionar el usuario actual
  private userSubject = new BehaviorSubject<Usuario | null>(this.decodeToken());
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Método para iniciar sesión
  login(correo: string, contrasena: string): Observable<string> {
    const endpoint = `${this.baseUrl}/api/auth/login`;
    return this.http.post<{ token: string }>(endpoint, { correo, contrasena }).pipe(
      map((response) => {
        const token = response.token;
        this.saveToken(token);
        return token;
      }),
      catchError(this.handleError)
    );
  }

  // Guardar el token en localStorage
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.userSubject.next(this.decodeToken());
  }

  // Obtener el token desde localStorage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Decodificar el token para obtener la información del usuario
  decodeToken(): Usuario | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payload));
      return decodedPayload as Usuario;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }

  // Verificar si el usuario está logueado
  isUserLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.userSubject.next(null);
  }

  // Registrar un nuevo usuario
  register(usuario: UsuarioRegistro): Observable<any> {
    const endpoint = `${this.baseUrl}/api/auth/register`;
    return this.http.post(endpoint, usuario).pipe(catchError(this.handleError));
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Error del lado del cliente:', error.error.message);
    } else {
      console.error(`Error del servidor (código ${error.status}):`, error.error);
    }
    return throwError(() => new Error(error.error?.message || 'Ocurrió un error inesperado.'));
  }
}