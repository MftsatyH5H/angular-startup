import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { InputSwitchModule } from 'primeng/inputswitch';
import { Router } from '@angular/router';
import { CvDataService } from '../cv-data.service';
@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [NavbarComponent, InputSwitchModule],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})
export class JobDetailsComponent implements OnInit {
  constructor(private router: Router, private cvDataService: CvDataService) {}
  job: any
  info : any
  data : any | undefined
  exp: any
  edu: any
  desc: any
  det: any
  req: any
  title: any
  ngOnInit():void {
    this.job = this.cvDataService.getJob();
     
   //   this.info = JSON.parse(response);
   //   this.data = JSON.parse(this.info);
   //   if(this.data.professional_experience || this.data.Professional_Experience || this.data.professional_Experience || this.data.Professional_experience || this.data.professionalExperience || this.data.ProfessionalExperience){
   //     this.exp = Object.entries(this.data.professional_experience || this.data.Professional_Experience || this.data.professional_Experience || this.data.Professional_experience || this.data.professionalExperience || this.data.ProfessionalExperience).map(item => item[1])
   //     console.log("exp",this.exp)
   //   }
   //   console.log(this.data);
 
   }
}
