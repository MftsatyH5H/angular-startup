import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FacialRecognitionComponent } from "./components/facial-recognition/facial-recognition.component";
import { UserSignupComponent } from "./components/user-signup/user-signup.component";
import { CommonModule } from '@angular/common';
import { SigninComponent } from "./components/signin/signin.component";
import { NavbarSignInComponent } from "./components/navbar-sign-in/navbar-sign-in.component";
import { ProfileDetailsComponent } from "./components/profile-details/profile-details.component";
import { SignInCompanyComponent } from "./components/sign-in-company/sign-in-company.component";
import { CompanyProfileComponent } from "./components/company-profile/company-profile.component";
import { JobDetailsComponent } from "./components/job-details/job-details.component";
import { UploadJobDescriptionComponent } from "./components/upload-job-description/upload-job-description.component";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, FacialRecognitionComponent, UserSignupComponent, CommonModule, SigninComponent, NavbarSignInComponent, ProfileDetailsComponent, SignInCompanyComponent, CompanyProfileComponent, JobDetailsComponent, RouterOutlet, UploadJobDescriptionComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-startup';
}
