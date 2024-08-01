import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarSignInCompanyComponent } from "../navbar-sign-in-company/navbar-sign-in-company.component";
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ErrorComponentComponent } from '../error-component/error-component.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [NavbarSignInCompanyComponent, FormsModule, ErrorComponentComponent, ToastModule ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
  providers: [MessageService]
})
export class SignUpComponent {
  fName: string = '';
  lName: string = '';
  password: string = '';
  email: string = '';
  number: string = '';
  errHead: string = '';
  errBody: string = '';
  constructor(private router: Router, private auth: AuthService, private messageService: MessageService) {}
  navigateToDest() {
    this.router.navigate(['/companyProfile']);
  }
  navigateToLogin() {
    this.router.navigate(['/']);
  }
  changeValuefName( val:any) {
    this.fName = val.target.value
  }
  changeValuelName( val:any) {
    this.fName = val.target.value
  }
  changeValueEmail( val:any) {
    this.fName = val.target.value
  }
  changeValuePassword( val:any) {
    this.fName = val.target.value
  }
  signUp(){
    const user= {
      "firstName": this.fName,
      "lastName": this.lName,
      "email": this.email,
      "password": this.password,
      "mobile": this.number,
      "role": "applicant"
    }
    this.auth.signUp(user).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Signup successful', detail: 'You can log in with your account!' });
      setTimeout(() => {
        this.router.navigate(['/']);
      },1500)
      
    }, (error) => {
      this.errHead= 'A Problem Occurred';
      this.errBody = error.error.message;
      const errorbtn = document.getElementById('error-modal-button');
      errorbtn?.click();
    })
  }
  
}
