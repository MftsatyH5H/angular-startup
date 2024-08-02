import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { InputSwitchModule } from 'primeng/inputswitch';
import { ProfileSkeletonComponent } from '../profile-skeleton/profile-skeleton.component';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { jwtDecode } from 'jwt-decode';
import { CvDataService } from '../cv-data.service';
@Component({
  selector: 'app-company-profile',
  standalone: true,
  imports: [NavbarComponent, InputSwitchModule, ProfileSkeletonComponent],
  templateUrl: './company-profile.component.html',
  styleUrl: './company-profile.component.css'
})
export class CompanyProfileComponent implements OnInit {
  loading: boolean = true;
  parsedToken: any
  openVac: any
  mappedOpenVac: any
  constructor(private router: Router,private auth :AuthService, private cvDataService: CvDataService) {}
  navigateToJob(id: string) {
    this.router.navigate(['/jobDescription/' +id]);
  }
  ngOnInit(): void {
    console.log(this.auth.getToken());
    this.parsedToken = jwtDecode(this.auth.getToken());
    console.log(this.parsedToken)
    this.cvDataService.getAllCompanyJobs().subscribe((response: any) => {
      console.log(response)
      this.openVac = response.filter((element: any) => element.company === this.parsedToken.id);
      this.mappedOpenVac = this.openVac.map((element: any) => {
        return {
          id: element._id,
          qualifications: element.Qualifications.split('\n')[0],
          role: element.Role.split('\n')[0]
        };
      });
      console.log(this.mappedOpenVac)
    })
    setTimeout(() => {
      this.loading = false;
    },400)
  }
  navigateToDest() {
    this.router.navigate(['/uploadJob']);
  }
}
