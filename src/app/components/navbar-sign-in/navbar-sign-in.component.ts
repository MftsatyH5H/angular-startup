import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar-sign-in',
  standalone: true,
  imports: [],
  templateUrl: './navbar-sign-in.component.html',
  styleUrl: './navbar-sign-in.component.css'
})
export class NavbarSignInComponent {
  constructor(private router: Router) {}
  navigateToDest2() {
    this.router.navigate(['/company']);
  }
}
