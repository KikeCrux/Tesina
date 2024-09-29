import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,
    HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  correo: string = '';
  contrasena: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    this.authService.login(this.correo, this.contrasena).subscribe(
      (usuario: Usuario) => {
        setTimeout(() => {
          this.authService.saveUserSession(usuario);
          this.router.navigate(['']);
        }, 1000);
      },
      (error) => {
        this.errorMessage = error.error.message;
      }
    );
  }
}
