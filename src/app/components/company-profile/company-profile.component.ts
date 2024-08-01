import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { InputSwitchModule } from 'primeng/inputswitch';
import { ProfileSkeletonComponent } from '../profile-skeleton/profile-skeleton.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-company-profile',
  standalone: true,
  imports: [NavbarComponent, InputSwitchModule, ProfileSkeletonComponent],
  templateUrl: './company-profile.component.html',
  styleUrl: './company-profile.component.css'
})
export class CompanyProfileComponent implements OnInit {
  loading: boolean = true;
  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    },400)
  }
  constructor(private router: Router) {}
  navigateToDest() {
    this.router.navigate(['/uploadJob']);
  }
}
