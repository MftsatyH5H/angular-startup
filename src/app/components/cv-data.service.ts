import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CvDataService {

  private cvId: any;
  private jobData: any;
  private apiUrl = 'http://10.100.102.6:8080/api/v1/user/Extract_Info_Cv';
  private apiUrlJob = 'http://10.100.102.6:8080/api/v1/user/Extract_Info_Jd';
  private apiUrlGet = "http://10.100.102.6:8080/api/v1/user/get_CV?cv_id="

  constructor(private http: HttpClient) { }

  setCvId(data: any): void {
    this.cvId = data;
    
  }

  getCvID(): any {
    return this.cvId;
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
    return this.http.get(this.apiUrlGet + Id, {responseType : 'text'});
  }
}
