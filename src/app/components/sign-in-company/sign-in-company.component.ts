import { Component } from '@angular/core';
import { NavbarSignInCompanyComponent } from "../navbar-sign-in-company/navbar-sign-in-company.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in-company',
  standalone: true,
  imports: [NavbarSignInCompanyComponent],
  templateUrl: './sign-in-company.component.html',
  styleUrl: './sign-in-company.component.css'
})
export class SignInCompanyComponent {
  constructor(private router: Router) {}
  navigateToDest() {
    this.router.navigate(['/companyProfile']);
  }
}
