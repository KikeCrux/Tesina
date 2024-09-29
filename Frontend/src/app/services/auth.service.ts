import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000';

  // Crear un BehaviorSubject con el tipo de Usuario
  private userSubject = new BehaviorSubject<Usuario | null>(this.getCurrentUser());
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Método para enviar las credenciales de login al servidor
  login(correo: string, contrasena: string): Observable<Usuario> {
    const endpoint = `${this.baseUrl}/login`;
    return this.http.post<Usuario>(endpoint, { correo, contrasena });
  }

  // Guardar usuario en sessionStorage después del login exitoso
  saveUserSession(user: Usuario) {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    this.userSubject.next(user);
  }

  // Obtener el usuario actual desde sessionStorage
  getCurrentUser(): Usuario | null {
    return JSON.parse(sessionStorage.getItem('currentUser') || 'null');
  }

  // Limpiar la sesión de usuario
  logout() {
    sessionStorage.removeItem('currentUser');
    this.userSubject.next(null);
  }

  // Verificar si hay un usuario logueado
  isUserLoggedIn(): boolean {
    return !!sessionStorage.getItem('currentUser');
  }
}