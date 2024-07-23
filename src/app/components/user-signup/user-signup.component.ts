import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { BadgeModule } from 'primeng/badge';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { CvDataService } from '../cv-data.service';
import { ProgressBarModule } from 'primeng/progressbar';
@Component({
  selector: 'app-user-signup',
  standalone: true,
  imports: [NavbarComponent, BadgeModule, NgIf, ProgressBarModule],
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.css'
})
export class UserSignupComponent {
  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  selectedFile:any;
  loading: any;
  constructor(private router: Router, private cvDataService: CvDataService) {}
  navigateToDest() {
    this.router.navigate(['/profile']);
  }
  navigateToDest2() {
    this.router.navigate(['/']);
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
      this.selectedFile = file;
      console.log('Selected file:', file);
    }
  }
  uploadFile(){
    const formData: FormData = new FormData();
    this.loading = true;
    formData.append('file', this.selectedFile, this.selectedFile.name);
    this.cvDataService.ExtractCvData(formData).subscribe((response) => {
      console.log(response);
      this.loading = false;
      this.cvDataService.setCvId(response.id);
      this.cvDataService.setCv(response.extracted);
      this.navigateToDest();
      
    },((error) => {
      console.log(error);
      this.loading = false;
    }))

  }
}
