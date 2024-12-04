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

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    this.errorMessage = '';

    this.authService.login(this.correo, this.contrasena).subscribe(
      () => {
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.errorMessage = error.error?.message || 'Error al iniciar sesión. Inténtalo nuevamente.';
      }
    );
  }
}