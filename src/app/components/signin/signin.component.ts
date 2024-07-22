import { Component } from '@angular/core';
import { NavbarSignInComponent } from "../navbar-sign-in/navbar-sign-in.component";
import { Router } from '@angular/router';
@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [NavbarSignInComponent],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  constructor(private router: Router) {}
  navigateToDest() {
    this.router.navigate(['/uploadCv']);
  }
  navigateToDest2() {
    this.router.navigate(['/company']);
  }
}
