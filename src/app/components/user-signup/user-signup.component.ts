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
@Component({
  selector: 'app-user-signup',
  standalone: true,
  imports: [NavbarComponent, BadgeModule, NgIf, ProgressBarModule, ErrorComponentComponent, DialogModule],
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.css'
})
export class UserSignupComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  selectedFile:any;
  loading: any;
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

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFileName = file.name;
      this.selectedFile = file;
      console.log('Selected file:', file);
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
    this.loading = true;
    const token: any = jwtDecode(this.token);
    this.id = token.id;
    formData.append('cv', this.selectedFile, this.selectedFile.name);
    formData.append('applicantId', this.id);
    this.cvDataService.ExtractCvData(formData, this.token).subscribe((response) => {
      console.log(response);
      this.loading = false;
      this.cvDataService.setCv(response.extracted);
      this.navigateToDest();
      
    },((error) => {
      console.log(error);
      this.isErr = true;
      this.errHead= 'A Problem Occurred';
      this.errBody = 'There was a connection issue with our services, please try again later!';
      const errorbtn = document.getElementById('error-modal-button');
      errorbtn?.click();
      this.loading = false;
    }))

  }
}
