import { Component } from '@angular/core';
import { NavbarSignInCompanyComponent } from "../navbar-sign-in-company/navbar-sign-in-company.component";
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-sign-in-company',
  standalone: true,
  imports: [NavbarSignInCompanyComponent, FormsModule, ToastModule],
  providers: [MessageService],
  templateUrl: './sign-in-company.component.html',
  styleUrl: './sign-in-company.component.css'
})
export class SignInCompanyComponent {
  email: string = '';
  password: string = '';
  constructor(private router: Router, private auth: AuthService, private messageService: MessageService) {}
  navigateToDest() {
    this.router.navigate(['/companyProfile']);
  }
  navigateToSignUp() {
    this.router.navigate(['/signUpCompany']);
  }
  signIn(){
    const company = {
      email: this.email,
      password: this.password
    }
    this.auth.signInCompany(company).subscribe((response) => {
      //@ts-ignore
      this.auth.setToken(response.token);
      this.router.navigate(['/companyProfile']);
    }, (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Sign in Failed', detail: error.error.message });
      console.log(error);
    })
  }
}
