import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Definimos la URL base de la API
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  private userSubject = new BehaviorSubject<any>(this.getCurrentUser());
  user$ = this.userSubject.asObservable();

  // Método para enviar las credenciales de login al servidor
  login(correo: string, contrasena: string): Observable<any> {
    const endpoint = `${this.baseUrl}/login`;
    return this.http.post(endpoint, { correo, contrasena });
  }

  // Guardar usuario en sessionStorage después del login exitoso
  saveUserSession(user: any) {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    this.userSubject.next(user);
  }

  // Obtener el usuario actual desde sessionStorage
  getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('currentUser') || 'null');
  }

  // Limpiar la sesión de usuario
  logout() {
    sessionStorage.removeItem('currentUser');
    this.userSubject.next(null);
  }

  // Verificar si hay un usuario logueado
  isUserLoggedIn() {
    return !!sessionStorage.getItem('currentUser');
  }
}