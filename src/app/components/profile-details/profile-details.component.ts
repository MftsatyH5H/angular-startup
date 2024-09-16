import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { InputSwitchModule } from 'primeng/inputswitch';
import { ActivatedRoute, Router } from '@angular/router';
import { CvDataService } from '../cv-data.service';
import { NgFor } from '@angular/common';
import { ProfileSkeletonComponent } from "../profile-skeleton/profile-skeleton.component";
import { AuthService } from '../auth.service';
import { SoftSkillsViewComponent } from "../soft-skills-view/soft-skills-view.component";
@Component({
  selector: 'app-profile-details',
  standalone: true,
  imports: [NavbarComponent, InputSwitchModule, NgFor, ProfileSkeletonComponent, SoftSkillsViewComponent],
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.css'
})
export class ProfileDetailsComponent implements OnInit {
  cvId: any
  cv: any
  skillList: any
  id: any
  currentUrl: string = '';
  token: any = ''
  loading: boolean = true
  isCompany: boolean = false;
  techSkillsPercentage: any = 0;
  userObject: any;
  expList: string[] = [];
  pubList: string[] = [];
  eduList: string[] = [];
  constructor(private router: Router, private cvDataService: CvDataService, private route: ActivatedRoute, private authService: AuthService) {}
  
  ngOnInit():void {
    this.token = this.authService.getTokenObject();
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.techSkillsPercentage = params.get('percentage');
    });
    this.cvDataService.getCvData(this.id).subscribe((response) => {
      console.log(response.data);
      this.cv = response.data.cv;
      this.userObject = response.data.user
      this.skillList = this.cv.Skills?.split('\n');
      this.expList = this.cv.Experience?.split('\n');
      this.pubList = this.cv.Publications?.split('Title:');
      this.eduList = this.cv.Education?.split('\n');
      this.loading = false
    }, (error) => {
      console.log(error);
    });
    if(this.token.role === 'company'){
      this.isCompany = true
    }
    // this.cvId = this.cvDataService.getCvID();
    // console.log(this.cvId)
    // this.cvDataService.getCvData(this.cvId).subscribe((response) => {
    //   console.log(response);
    // })
    // this.data = this.cvId.content;
    // this.exp = this.data["Professional Experience"].split("\n*");
    // this.edu = this.data.Education.split("\n*");
    // console.log(this.exp, this.edu);
    
  //   this.info = JSON.parse(response);
  //   this.data = JSON.parse(this.info);
  //   if(this.data.professional_experience || this.data.Professional_Experience || this.data.professional_Experience || this.data.Professional_experience || this.data.professionalExperience || this.data.ProfessionalExperience){
  //     this.exp = Object.entries(this.data.professional_experience || this.data.Professional_Experience || this.data.professional_Experience || this.data.Professional_experience || this.data.professionalExperience || this.data.ProfessionalExperience).map(item => item[1])
  //     console.log("exp",this.exp)
  //   }
  //   console.log(this.data);

  }
}
