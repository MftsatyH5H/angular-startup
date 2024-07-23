import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CvDataService {

  private cvId: any;
  private cv :any;
  private jobData: any;
  private apiUrl = 'http://10.100.102.6:5522/api/v1/user/Extract_CV';
  private apiUrlJob = 'http://10.100.102.6:5522/api/v1/user/Extract_JD';
  private apiUrlGet = "http://10.100.102.6:5522/api/v1/user/get_CV?cv_id="

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

  getJob(): any {
    return this.jobData;
  }

  ExtractCvData(formData: any): Observable<any> {
    console.log(this.apiUrl)
    return this.http.post(this.apiUrl, formData);
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
