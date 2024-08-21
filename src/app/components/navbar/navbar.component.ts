import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { AuthService } from '../auth.service';
import { CvDataService } from '../cv-data.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  token: any
  firstInitial: any
  lastInitial: any
  profileMenu: boolean = false;
  currentRoute: string = '';
  isEditingProfile: boolean = false;
  
constructor(private router: Router, private authService: AuthService, private activatedRoute: ActivatedRoute, private cvDataService: CvDataService){}
  ngOnInit(): void {
    this.activatedRoute.url.subscribe(url => {
      this.currentRoute = url.join('/');
    });
   const isAuth = this.authService.isAuth();
   if(isAuth){
    this.token = this.authService.getTokenObject();
    console.log('navbar: ',this.token);
    this.firstInitial = Array.from(this.token.firstName)[0];
    this.lastInitial = Array.from(this.token.lastName)[0];
    if(this.token.role === 'company'){
      this.isEditingProfile = false;
    }
    if(this.token.role !== 'company'){
      this.cvDataService.getCvData(this.token.id).subscribe((response) => {
        this.isEditingProfile = false;
        console.log('response',response)
      },
      (error) => {
        this.isEditingProfile = true;
      }
      )
    }
   } 
  }
  navigateToExplore(){
      this.router.navigate(['/explore']);
  }
  logout(){
    this.authService.deleteToken();
    this.router.navigate(['/']);
  }
  editProfile(){
    this.router.navigate(['/uploadCv']);
  }
  goToProfile(){
    if(this.token.role === 'company'){
      this.router.navigate(['/companyProfile/']);
    } else{
      this.router.navigate(['/profile/' + this.token.id]);
    }
    
  }

}
