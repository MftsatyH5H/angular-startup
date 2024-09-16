import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { SignInCompanyComponent } from './components/sign-in-company/sign-in-company.component';
import { NgModule } from '@angular/core';
import { UserSignupComponent } from './components/user-signup/user-signup.component';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { CompanyProfileComponent } from './components/company-profile/company-profile.component';
import { JobDetailsComponent } from './components/job-details/job-details.component';
import { UploadJobDescriptionComponent } from './components/upload-job-description/upload-job-description.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignUpCompanyComponent } from './components/sign-up-company/sign-up-company.component';
import { ExploreComponent } from './components/explore/explore.component';
import { SoftQuestionsComponent } from './components/soft-questions/soft-questions.component';

export const routes: Routes = [
    { path: '', component: SigninComponent },
    { path: 'signUp', component: SignUpComponent },
    { path: 'company', component: SignInCompanyComponent },
    { path: 'uploadCv', component: UserSignupComponent },
    { path: 'profile/:id/:percentage', component: ProfileDetailsComponent },
    { path: 'profile/:id', component: ProfileDetailsComponent },
    { path: 'soft-skills', component: SoftQuestionsComponent },
    { path: 'companyProfile', component: CompanyProfileComponent },
    { path: 'jobDescription/:id', component: JobDetailsComponent },
    { path: 'uploadJob', component: UploadJobDescriptionComponent },
    { path: 'signUpCompany', component: SignUpCompanyComponent },
    { path: 'explore', component: ExploreComponent },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }