import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-sign-in-company',
  standalone: true,
  imports: [],
  templateUrl: './navbar-sign-in-company.component.html',
  styleUrl: './navbar-sign-in-company.component.css'
})
export class NavbarSignInCompanyComponent {
  constructor(private router: Router) {}
  navigateToDest() {
    this.router.navigate(['/']);
  }
}
