import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  currentUser: Usuario | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.currentUser = user;
    });
  }
  // Método para cerrar sesión
  logout() {
    this.authService.logout();
    window.location.reload();
  }
}
