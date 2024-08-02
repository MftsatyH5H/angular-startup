import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { InputSwitchModule } from 'primeng/inputswitch';
import { ActivatedRoute, Router } from '@angular/router';
import { CvDataService } from '../cv-data.service';
import { AuthService } from '../auth.service';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [NavbarComponent, InputSwitchModule],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})
export class JobDetailsComponent implements OnInit {
  constructor(private router: Router, private cvDataService: CvDataService, private auth : AuthService, private route: ActivatedRoute) {}
  job: any
  info : any
  data : any | undefined
  exp: any
  edu: any
  desc: any
  resList: any
  reqList: any
  title: any
  token: any
  jobId: any
  openVac: any
  mappedOpenVac: any
  users: any
  ngOnInit():void {
    this.route.paramMap.subscribe(params => {
      this.jobId = params.get('id');
    });
    console.log(this.jobId)
    this.cvDataService.getAllCompanyJobs().subscribe((response: any) => {
      console.log(response)
      this.token = jwtDecode(this.auth.getToken());
      this.job = response.find((element: any) => element._id === this.jobId);
      this.resList = this.job.Responsibilities.split('\n');
      this.reqList = this.job.Qualifications.split('\n');
      this.title = this.job.Role.split('\n')[0];
      this.openVac = response.filter((element: any) => element.company === this.token.id);
      this.mappedOpenVac = this.openVac.map((element: any) => {
        return {
          id: element._id,
          qualifications: element.Qualifications.split('\n')[0],
          role: element.Role.split('\n')[0]
        };
      });
      this.cvDataService.getAllUsers().subscribe((response: any) => {
        this.users = response.users;
      });
      console.log(this.mappedOpenVac);

    })
  
   //   this.info = JSON.parse(response);
   //   this.data = JSON.parse(this.info);
   //   if(this.data.professional_experience || this.data.Professional_Experience || this.data.professional_Experience || this.data.Professional_experience || this.data.professionalExperience || this.data.ProfessionalExperience){
   //     this.exp = Object.entries(this.data.professional_experience || this.data.Professional_Experience || this.data.professional_Experience || this.data.Professional_experience || this.data.professionalExperience || this.data.ProfessionalExperience).map(item => item[1])
   //     console.log("exp",this.exp)
   //   }
   //   console.log(this.data);
 
   }
   navigateToJob(id: string) {
    this.router.navigate(['/jobDescription/' +id]);
  }
  generateNumber(){return Math.floor(Math.random() * (60 - 55 + 1)) + 55;};
}
