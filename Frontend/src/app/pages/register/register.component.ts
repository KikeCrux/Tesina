import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UsuarioRegistro } from '../../models/usuario';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, FooterComponent, HeaderComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  usuario: UsuarioRegistro = {
    correo: '',
    contrasena: '',
    nombre_cliente: '',
    telefono: '',
    tipo_usuario: 'menudeo' // Asumimos que solo usuarios de menudeo se registran desde el frontend
  };

  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onRegister() {
    this.errorMessage = ''; // Limpiar mensajes de error previos

    // Llamar al servicio de autenticación para registrar al usuario
    this.authService.register(this.usuario).subscribe(
      (response) => {
        // Redirigir al inicio de sesión tras un registro exitoso
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error al registrar', error);
        this.errorMessage = error.error?.message || 'Error en el registro. Inténtalo nuevamente.';
      }
    );
  }
}
