import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarSignInCompanyComponent } from "../navbar-sign-in-company/navbar-sign-in-company.component";
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-sign-up-company',
  standalone: true,
  imports: [NavbarSignInCompanyComponent, FormsModule, ToastModule],
  templateUrl: './sign-up-company.component.html',
  styleUrl: './sign-up-company.component.css'
})
export class SignUpCompanyComponent {
  fName: string = '';
  lName: string = '';
  password: string = '';
  email: string = '';
  number: string = '';
  errHead: string = '';
  errBody: string = '';
  name: string = ''
  constructor(private router: Router, private auth : AuthService, private messageService: MessageService) {}
  navigateToDest() {
    this.router.navigate(['/companyProfile']);
  }
  signUp(){
    const company = {
      "firstName": this.fName,
      "lastName": this.lName,
      "email": this.email,
      "password": this.password,
      "mobile": this.number,
      "name": this.name,
      "role": "company",
      "address": "123 startup avenue"
    }
    this.auth.signUpCompany(company).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Signup successful', detail: 'You can log in with your account!' });
      setTimeout(() => {
        this.router.navigate(['/company']);
      },1500)
      
    }, (error) => {
      this.errHead= 'A Problem Occurred';
      this.errBody = error.error.message;
      const errorbtn = document.getElementById('error-modal-button');
      errorbtn?.click();
    })
  }
  
}
