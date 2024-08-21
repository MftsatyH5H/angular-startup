import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  backend = process.env["BACKEND_URL"] 
  api = this.backend + '/api/v1/users/register'
  apiLogin = this.backend +'/api/v1/users/login'
  apiSignUpCompany = this.backend +'/api/v1/companies' 
  apiSignInCompany = this.backend + '/api/v1/companies/login'

  constructor(private http: HttpClient, private cookieService: CookieService) { }
  signUp(user: any){
    console.log(this.api);
    return this.http.post(this.api, user);
  }
  signUpCompany(company: any){
    console.log(this.apiSignUpCompany);
    return this.http.post(this.apiSignUpCompany, company);
  }
  signInCompany(company: any){
    console.log(this.apiSignInCompany);
    return this.http.post(this.apiSignInCompany, company);
  }
  
  login(user:any){
    console.log(this.apiLogin);
    return this.http.post(this.apiLogin, user)
  }
  setToken(token: string): void {
    this.cookieService.set('auth_token', token);
  }
  getToken(): any {
    return this.cookieService.get('auth_token');
  }
  deleteToken(){
    this.cookieService.delete('auth_token')
  }
  isAuth(): boolean {
    return !!this.getToken();
  }
  getTokenObject(): any{
    if(this.isAuth()){
      const token = jwtDecode(this.getToken());
      return token;
    } else{
      return undefined;
    }
  }
}
