import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { InputSwitchModule } from 'primeng/inputswitch';
import { ActivatedRoute, Router } from '@angular/router';
import { CvDataService } from '../cv-data.service';
import { NgFor } from '@angular/common';
import { ProfileSkeletonComponent } from "../profile-skeleton/profile-skeleton.component";
@Component({
  selector: 'app-profile-details',
  standalone: true,
  imports: [NavbarComponent, InputSwitchModule, NgFor, ProfileSkeletonComponent],
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.css'
})
export class ProfileDetailsComponent implements OnInit {
  cvId: any
  cv: any
  skillList: any
  id: any
  loading: boolean = true
  expList: string[] = [];
  pubList: string[] = [];
  constructor(private router: Router, private cvDataService: CvDataService, private route: ActivatedRoute) {}
  
  ngOnInit():void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.cvDataService.getCvData(this.id).subscribe((response) => {
      console.log(response.data);
      this.cv = response.data;
      this.skillList = this.cv.Skills?.split('\n');
      this.expList = this.cv.Experience?.split('\n');
      this.pubList = this.cv.Publications?.split('Title:');
      console.log(this.expList);
      console.log(this.pubList);
      this.loading = false
    }, (error) => {
      console.log(error);
    });

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
