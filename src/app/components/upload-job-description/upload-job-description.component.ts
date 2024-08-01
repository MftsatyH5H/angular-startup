import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { CvDataService } from '../cv-data.service';
import { ProgressBarModule } from 'primeng/progressbar';
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
  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  constructor(private router: Router, private cvDataService: CvDataService) {}
  navigateToDest() {
    this.router.navigate(['/jobDescription']);
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
    formData.append('file', this.selectedFile, this.selectedFile.name);
    this.cvDataService.ExtractJobData(formData).subscribe((response) => {
      console.log(response);
      this.loading = false;
      this.cvDataService.setJob(response.extracted);
      this.navigateToDest();
      
    },((error) => {
      console.log(error);
      this.loading = false;
    }))

  }
}
