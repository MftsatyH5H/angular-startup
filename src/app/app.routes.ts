import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { SignInCompanyComponent } from './components/sign-in-company/sign-in-company.component';
import { NgModule } from '@angular/core';
import { UserSignupComponent } from './components/user-signup/user-signup.component';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { CompanyProfileComponent } from './components/company-profile/company-profile.component';
import { JobDetailsComponent } from './components/job-details/job-details.component';
import { UploadJobDescriptionComponent } from './components/upload-job-description/upload-job-description.component';

export const routes: Routes = [
    { path: '', component: SigninComponent },
    { path: 'company', component: SignInCompanyComponent },
    { path: 'uploadCv', component: UserSignupComponent },
    { path: 'profile', component: ProfileDetailsComponent },
    { path: 'companyProfile', component: CompanyProfileComponent },
    { path: 'jobDescription', component: JobDetailsComponent },
    { path: 'uploadJob', component: UploadJobDescriptionComponent },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }