import { Component, OnInit } from '@angular/core';
import { InputSwitchModule } from 'primeng/inputswitch';
import { NavbarComponent } from "../navbar/navbar.component";
import { CvDataService } from '../cv-data.service';
import { AuthService } from '../../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [InputSwitchModule, NavbarComponent],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.css'
})
export class ExploreComponent implements OnInit {
  allJobs: any
  openVac :any
 constructor(private cvDataService: CvDataService, private auth : AuthService, private route: ActivatedRoute, private router: Router,){}
 ngOnInit(): void {
  this.cvDataService.getAllCompanyJobs().subscribe((response: any) => {
    console.log(response)
    this.openVac = response
    console.log(this.openVac)
  })
  
 }
 navigateToJob(id: string) {
  this.router.navigate(['/jobDescription/' +id]);
}
}
