import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
@Component({
  selector: 'app-profile-skeleton',
  standalone: true,
  imports: [SkeletonModule],
  templateUrl: './profile-skeleton.component.html',
  styleUrl: './profile-skeleton.component.css'
})
export class ProfileSkeletonComponent {

}
