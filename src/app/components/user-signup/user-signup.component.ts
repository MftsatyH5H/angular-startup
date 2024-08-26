import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { BadgeModule } from 'primeng/badge';
import {  NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { CvDataService } from '../cv-data.service';
import { ErrorComponentComponent } from '../error-component/error-component.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../auth.service';
import jwt_decode, { jwtDecode } from 'jwt-decode';
import { TagModule } from 'primeng/tag';
@Component({
  selector: 'app-user-signup',
  standalone: true,
  imports: [NavbarComponent, BadgeModule, NgIf, ProgressBarModule, ErrorComponentComponent, DialogModule, TagModule],
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.css'
})
export class UserSignupComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  @ViewChild('videoInput') videoInput: ElementRef | undefined;
  selectedFile:any;
  selectedVideo:any;
  selectedVideoName:any;
  loadingCv: any;
  loadingVideo: any;
  cvUploaded: boolean = false;
  videoUploaded: boolean = false;
  loadingValueCv: number = 0;
  loadingValueVideo: number = 0;
  loadingDescCv: string = 'Uploading';
  loadingDescVideo: string = 'Uploading';
  isErr: boolean = false;
  token: string = ''
  errHead: string = '';
  errBody: string = '';
  id: any
  constructor(private router: Router, private cvDataService: CvDataService, private authService: AuthService) {}
  ngOnInit(): void {
   if(!this.authService.isAuth()){
    this.navigateToDest2();
   }
   this.token = this.authService.getToken()
  }
  navigateToDest() {
    this.router.navigate(['/profile/' + this.id]);
  }
  navigateToDest2() {
    this.router.navigate(['/']);
  }
  selectedFileName: string | undefined
  triggerFileInput(): void {
    if(this.fileInput)
    this.fileInput.nativeElement.click();
  }
  triggerVideoInput(){
    if(this.videoInput){
      this.videoInput.nativeElement.click();
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFileName = file.name;
      this.selectedFile = file;
      console.log('Selected file:', file);
      this.uploadFile();
    }
  }
  onVideoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedVideoName = file.name;
      this.selectedVideo = file;
      console.log('Selected file:', file);
      this.uploadVideo();
    }
  }
  uploadFile(){
    if(!this.selectedFile){
      const errorbtn = document.getElementById('error-modal-button');
      errorbtn?.click();
      this.errHead= 'You must choose a file first!';
      this.errBody = 'Press the "Upload Your CV" button, and choose a file!';
      return;
    }
    const formData: FormData = new FormData();
    this.loadingCv = true;
    const token: any = jwtDecode(this.token);
    this.id = token.id;
    formData.append('cv', this.selectedFile, this.selectedFile.name);
    formData.append('applicantId', this.id);
    setTimeout(() => {
      this.loadingValueCv = 6;
      this.loadingDescCv = 'Extracting Data...'
    }, 3000)

    setTimeout(() => {
      this.loadingValueCv = 12;
      this.loadingDescCv = 'Extracting Data...'
    }, 8000)

    setTimeout(() => {
      this.loadingValueCv = 19;
      this.loadingDescCv = 'Extracting Data...'
    }, 11000)

    setTimeout(() => {
      this.loadingValueCv = 25;
      this.loadingDescCv = 'Analyzing...'
    }, 13000)

    setTimeout(() => {
      this.loadingValueCv = 35;
      this.loadingDescCv = 'Analyzing...'
    }, 17000)

    setTimeout(() => {
      this.loadingValueCv = 39;
      this.loadingDescCv = 'Analyzing...'
    }, 23000)

    setTimeout(() => {
      this.loadingValueCv = 35;
      this.loadingDescCv = 'Analyzing...'
    }, 27000)

    setTimeout(() => {
      this.loadingValueCv = 40;
      this.loadingDescCv = 'Analyzing...'
    }, 33000)

    setTimeout(() => {
      this.loadingValueCv = 50;
      this.loadingDescCv = 'Analyzing...'
    }, 27000)

    setTimeout(() => {
      this.loadingValueCv = 55;
      this.loadingDescCv = 'Analyzing...'
    }, 32000)

    setTimeout(() => {
      this.loadingValueCv = 61;
      this.loadingDescCv = 'Analyzing...'
    }, 38000)

    setTimeout(() => {
      this.loadingValueCv = 67;
      this.loadingDescCv = 'Analyzing...'
    }, 43000)

    setTimeout(() => {
      this.loadingValueCv = 71;
      this.loadingDescCv = 'Analyzing...'
    }, 47000)

    setTimeout(() => {
      this.loadingValueCv = 79;
      this.loadingDescCv = 'Analyzing...'
    }, 51000)

    setTimeout(() => {
      this.loadingValueCv = 85;
      this.loadingDescCv = 'Finalizing...'
    }, 55000)

    setTimeout(() => {
      this.loadingValueCv = 90;
      this.loadingDescCv = 'Finalizing...'
    }, 60000)

    setTimeout(() => {
      this.loadingValueCv = 95;
      this.loadingDescCv = 'Finalizing...'
    }, 65000)

    setTimeout(() => {
      this.loadingValueCv = 95;
      this.loadingDescCv = 'Finalizing...'
    }, 73000)
    this.cvDataService.ExtractCvData(formData, this.token).subscribe((response) => {
      setTimeout(() => {
        this.loadingValueCv = 98;
        this.loadingDescCv = 'Finalizing...'
      }, 78000)
      console.log(response);
      this.loadingCv = false;
      this.cvDataService.setCv(response.extracted);
      // this.navigateToDest();
      this.cvUploaded = true
      this.loadingCv = false;
      
    },((error) => {
      console.log(error);
      this.isErr = true;
      this.errHead= 'A Problem Occurred';
      this.errBody = 'There was a connection issue with our services, please try again later!';
      const errorbtn = document.getElementById('error-modal-button');
      errorbtn?.click();
      this.loadingCv = false;
    }))
  }
  uploadVideo(){
    if(!this.selectedVideo){
      const errorbtn = document.getElementById('error-modal-button');
      errorbtn?.click();
      this.errHead= 'You must choose a file first!';
      this.errBody = 'Press the "Upload Your CV" button, and choose a file!';
      return;
    }
    this.loadingVideo = true;
    // const token: any = jwtDecode(this.token);
    // this.id = token.id;
    // formData.append('video', this.selectedFile, this.selectedFile.name);
    // formData.append('applicantId', this.id);
    const token: any = jwtDecode(this.token);
    const id = token.id;
    setTimeout(() => {
      this.loadingValueVideo = 6;
      this.loadingDescVideo = 'Extracting Data...'
    }, 3000)

    setTimeout(() => {
      this.loadingValueVideo = 12;
      this.loadingDescVideo = 'Extracting Data...'
    }, 8000)

    setTimeout(() => {
      this.loadingValueVideo = 19;
      this.loadingDescVideo = 'Extracting Data...'
    }, 11000)

    setTimeout(() => {
      this.loadingValueVideo = 25;
      this.loadingDescVideo = 'Analyzing...'
    }, 13000)

    setTimeout(() => {
      this.loadingValueVideo = 35;
      this.loadingDescVideo = 'Analyzing...'
    }, 17000)

    setTimeout(() => {
      this.loadingValueVideo = 39;
      this.loadingDescVideo = 'Analyzing...'
    }, 23000)

    setTimeout(() => {
      this.loadingValueVideo = 35;
      this.loadingDescVideo = 'Analyzing...'
    }, 27000)

    setTimeout(() => {
      this.loadingValueVideo = 40;
      this.loadingDescVideo = 'Analyzing...'
    }, 33000)

    setTimeout(() => {
      this.loadingValueVideo = 50;
      this.loadingDescVideo = 'Analyzing...'
    }, 27000)

    setTimeout(() => {
      this.loadingValueVideo = 55;
      this.loadingDescVideo = 'Analyzing...'
    }, 32000)

    setTimeout(() => {
      this.loadingValueVideo = 61;
      this.loadingDescVideo = 'Analyzing...'
    }, 38000)

    setTimeout(() => {
      this.loadingValueVideo = 67;
      this.loadingDescVideo = 'Analyzing...'
    }, 43000)

    setTimeout(() => {
      this.loadingValueVideo = 71;
      this.loadingDescVideo = 'Analyzing...'
    }, 47000)

    setTimeout(() => {
      this.loadingValueVideo = 79;
      this.loadingDescVideo = 'Analyzing...'
    }, 51000)

    setTimeout(() => {
      this.loadingValueVideo = 85;
      this.loadingDescVideo = 'Finalizing...'
    }, 55000)

    setTimeout(() => {
      this.loadingValueVideo = 90;
      this.loadingDescVideo = 'Finalizing...'
    }, 60000)

    setTimeout(() => {
      this.loadingValueVideo = 95;
      this.loadingDescVideo = 'Finalizing...'
    }, 65000)

    setTimeout(() => {
      this.loadingValueVideo = 95;
      this.loadingDescVideo = 'Finalizing...'
    }, 73000)
    this.cvDataService.getFacialRecognition(this.selectedVideo, this.selectedVideoName, id).subscribe((response: any) => {
      console.log(response);
      // this.cvDataService.setCv(response.extracted);
      // this.navigateToDest();
      const fcData = JSON.parse(response.reco);
      const token: any = jwtDecode(this.token);
      const id = token.id;
      this.cvDataService.postFacialToNode(id, fcData).subscribe((response: any) => {
        console.log(response)
        this.videoUploaded = true
        this.loadingVideo = false;
      });
    },((error) => {
      console.log(error);
      this.isErr = true;
      this.errHead= 'A Problem Occurred';
      this.errBody = 'There was a connection issue with our services, please try again later!';
      const errorbtn = document.getElementById('error-modal-button');
      errorbtn?.click();
      this.loadingVideo = false;
    }))
  }
  takeSkillsQuiz(){
    if(this.cvUploaded && this.videoUploaded){
      this.router.navigate(['/soft-skills']);
    } else{
      this.isErr = true;
      this.errHead= 'Upload Your Information first!';
      this.errBody = 'You Need to upload your CV, and an introduction video first!';
      const errorbtn = document.getElementById('error-modal-button');
      errorbtn?.click();
      this.loadingCv = false;
    }
  }
}
