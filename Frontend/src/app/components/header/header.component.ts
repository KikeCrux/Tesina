import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  currentUser: any = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.currentUser = user;
    });
  }

  checkUserStatus() {
    this.currentUser = this.authService.getCurrentUser();
  }

  logout() {
    setTimeout(() => {
      this.authService.logout();
      this.checkUserStatus();
      window.location.reload();
    }, 1000);
  }
}
