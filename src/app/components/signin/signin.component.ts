import { Component } from '@angular/core';
import { NavbarSignInComponent } from "../navbar-sign-in/navbar-sign-in.component";
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CvDataService } from '../cv-data.service';
@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [NavbarSignInComponent, ToastModule, FormsModule, ToastModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  email :string = '';
  password: string = '';
  apiResponse: any
  constructor(private router: Router, private authService: AuthService, private messageService: MessageService, private cvDataService: CvDataService) {}
  navigateToDest() {
    this.router.navigate(['/uploadCv']);
  }
  navigateToSignUp() {
    this.router.navigate(['/signUp']);
  }
  navigateToDest2() {
    this.router.navigate(['/company']);
  }
  signIn(){
    const user = {
      email : this.email,
      password : this.password
    }
    this.authService.login(user).subscribe((response) => {
      this.apiResponse = response;
      this.authService.setToken(this.apiResponse.token);
      const token = this.authService.getTokenObject();
      const id = token.id
      this.cvDataService.getCvData(id).subscribe((response) => {
        console.log(response);
        this.router.navigate(['/profile/' + id]);
      },
      (error) => {
        this.navigateToDest();
      }
    )
    },(error) => {
      this.messageService.add({ severity: 'error', summary: 'Sign in Failed', detail: error.error.message });
      console.log(error);
    })
  }
}
