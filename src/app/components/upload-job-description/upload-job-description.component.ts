import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { CvDataService } from '../cv-data.service';
import { ProgressBarModule } from 'primeng/progressbar';
import { AuthService } from '../auth.service';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-upload-job-description',
  standalone: true,
  imports: [NavbarComponent, ProgressBarModule],
  templateUrl: './upload-job-description.component.html',
  styleUrl: './upload-job-description.component.css'
})
export class UploadJobDescriptionComponent {
  loading = false
  selectedFile: any
  errHead: string = '';
  errBody: string = '';
  token: any
  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  constructor(private router: Router, private cvDataService: CvDataService, private auth: AuthService) {}
  navigateToDest(id: string) {
    this.router.navigate(['/jobDescription/' +id]);
  }
  navigateToDest2() {
    this.router.navigate(['/companyProfile']);
  }
  selectedFileName: string | undefined
  triggerFileInput(): void {
    if(this.fileInput)
    this.fileInput.nativeElement.click();
  }
  
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFileName = file.name;
      console.log('Selected file:', file);
      // You can now upload the file to your server or perform other actions with it
      this.selectedFile = file;
    }
  }
  uploadFile(){
    const formData: FormData = new FormData();
    this.loading = true;
    this.token = jwtDecode(this.auth.getToken());
    const formdata = new FormData();
    formdata.append('company', this.token.id);
    console.log(this.token.id)
    formdata.append('description', this.selectedFile)
    this.cvDataService.getJob(formdata).subscribe((response: { extracted: any; }) => {
      console.log(response);
      this.loading = false;
      // this.cvDataService.setJob(response.extracted);
      //@ts-ignore
      this.navigateToDest(response._id);
      
    },((error: any) => {
      console.log(error);
      this.loading = false;
    }))

  }
}
