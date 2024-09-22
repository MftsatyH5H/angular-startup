import { Component, Input, OnInit } from '@angular/core';
import { CvDataService } from '../cv-data.service';
import { Router } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-job-candidates',
  standalone: true,
  imports: [SkeletonModule],
  templateUrl: './job-candidates.component.html',
  styleUrl: './job-candidates.component.css'
})
export class JobCandidatesComponent implements OnInit {
  @Input() JobId: any;
  loading: boolean = true;
  users: any[] = [];
  loadingSkeletons = Array(6).fill(0);
  constructor(private cvDataService: CvDataService, private router: Router){}
  ngOnInit(): void {
    this.cvDataService.getSimilarCandidates(this.JobId).subscribe((response: any) => {
      console.log('similar candidates: ',response.data);
      this.users = response.data.sort((a: any, b: any) => b.totalScore - a.totalScore);
      this.loading = false;
    });  
  }
  navigateToCandidate(id: string, percentage: any){
    this.router.navigate(['/profile/' + id + '/' + percentage]);
  }
  roundUpNumber(number: number){
    return Math.ceil(number)
  }
  
}
