import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  backend = process.env["BACKEND_URL"] 
  api = this.backend + '/api/v1/users/register'
  apiLogin = this.backend +'/api/v1/users/login'
  constructor(private http: HttpClient, private cookieService: CookieService) { }
  signUp(user: any){
    console.log(this.api);
    return this.http.post(this.api, user);
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
  isAuth(): boolean {
    return !!this.getToken();
  }
}
