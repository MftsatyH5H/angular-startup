import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { InputSwitchModule } from 'primeng/inputswitch';
import { Router } from '@angular/router';
@Component({
  selector: 'app-company-profile',
  standalone: true,
  imports: [NavbarComponent, InputSwitchModule],
  templateUrl: './company-profile.component.html',
  styleUrl: './company-profile.component.css'
})
export class CompanyProfileComponent {
  constructor(private router: Router) {}
  navigateToDest() {
    this.router.navigate(['/uploadJob']);
  }
}
