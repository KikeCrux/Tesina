import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,
    HttpClientModule, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  correo: string = '';
  contrasena: string = '';
  errorMessage: string = '';

  private cuentasAdministradores = [
    { correo: 'admin@gmail.com', contrasena: 'admin123' },
    { correo: 'kikecrux@gmail.com', contrasena: 'admin456' },
    { correo: 'piñatasAdmin@egmail.com', contrasena: 'admin789' }
  ];

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    this.errorMessage = '';

    const cuentaAdmin = this.cuentasAdministradores.find(
      admin => admin.correo === this.correo && admin.contrasena === this.contrasena
    );

    if (cuentaAdmin) {
      this.router.navigate(['/dashboard']);
      return;
    }

    this.authService.login(this.correo, this.contrasena).subscribe(
      () => {
        this.router.navigate(['/home']);
      },
      (error) => {
        this.errorMessage = error.error?.message || 'Error al iniciar sesión. Inténtalo nuevamente.';
      }
    );
  }
}


