import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CvDataService {
 backend = process.env["BACKEND_URL"] 
  private cvId: any;
  private cv :any;
  private jobData: any;
  private apiUrl = this.backend + '/api/v1/cvs/';
  private apiUrlJob = this.backend + '/api/v1/jobs';
  private apiUrlGet = this.backend +"/api/v1/cvs/"
  private apiGetAllJobs = this.backend + '/api/v1/jobs/'
  private apiGetAllUsers = this.backend + '/api/v1/users/'
  constructor(private http: HttpClient) { }

  setCvId(data: any): void {
    this.cvId = data;
  }

  getCvID(): any {
    return this.cvId;
  }

  setCv(cv: any): any{
    this.cv = cv 
  }

  getCv(): any{
    return this.cv
  }
  setJob(data: any): void {
    this.jobData = data;
  }

  getJob(formData: any): any {
    console.log(this.apiUrlJob)
    return this.http.post(this.apiUrlJob, formData);
  }
  getAllCompanyJobs(): any{
    return this.http.get(this.apiGetAllJobs);
  }
  getAllUsers(){
    return this.http.get(this.apiGetAllUsers);
  }
  ExtractCvData(formData: any, token: any): Observable<any> {
    console.log(this.apiUrl)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(this.apiUrl, formData, {headers});
  }
  ExtractJobData(formData: any): Observable<any> {
    console.log(this.apiUrlJob)
    return this.http.post(this.apiUrlJob, formData);
  }
  getCvData(Id: any): Observable<any> {
    console.log(this.apiUrlGet + Id)
    return this.http.get(this.apiUrlGet + Id);
  }
}
