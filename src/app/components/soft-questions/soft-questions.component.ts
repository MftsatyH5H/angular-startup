import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { RadioButtonModule } from 'primeng/radiobutton';
import { interval, map, Subscription } from 'rxjs';
import { CvDataService } from '../cv-data.service';
import { ProgressBarModule } from 'primeng/progressbar';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-soft-questions',
  standalone: true,
  imports: [NavbarComponent, RadioButtonModule, ProgressBarModule],
  templateUrl: './soft-questions.component.html',
  styleUrl: './soft-questions.component.css'
})
export class SoftQuestionsComponent {
  remainingTime: number = 600;  
  minutes: number = 0;
  seconds: number = 0;
  private timerSubscription: Subscription | undefined;
  questions: any
  currentQuestions: any;
  currentNumber: any = 0;
  finalResult: any = [];
  question1: any =0
  question2: any =0
  question3: any =0
  currentCategory: any = '' 
  loadingFinish: boolean = false;

  constructor(private cvDataService: CvDataService, private authService: AuthService, private router: Router, ){

  }
  ngOnInit(): void {
    this.cvDataService.getSoftQuestions().subscribe((response :any) => {
      this.startTimer();
      this.questions = response.DATA
      this.currentQuestions = this.questions.slice(this.currentNumber, this.currentNumber + 1);
      this.questions.map((question: any) => {
        var prop = question.category
        this.finalResult.push(
          {
            [`${prop}`] : 0
          }
      );
      })
      
      console.log(this.finalResult)
    })
    
  }
  startTimer(): void {
    this.timerSubscription = interval(1000).pipe(
      map(() => {
        this.remainingTime--;
        this.minutes = Math.floor(this.remainingTime / 60);
        this.seconds = this.remainingTime % 60;
      })
    ).subscribe();

    setTimeout(() => {
      this.stopTimer();
    }, this.remainingTime * 1000); // Stop timer after 2 minutes
  }

  stopTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
  getAnswers(a: any){
    
    return Object.keys(a);
  }
  changeValue(value: any,Q:any ,category: any, index: any){
    this.currentCategory = category
    if(index === 0){
      this.question1 = Q.A[value];
      console.log('question 1: ',this.question1)
    }
    if(index === 1){
      this.question2 = Q.A[value];
      console.log('question 2: ',this.question2)
    }
    if(index === 2){
      this.question3 = Q.A[value];
      console.log('question 3: ',this.question3)
    }
    
  }
  changePage(){
    if(this.currentNumber !== this.questions.length){
      this.currentNumber = this.currentNumber + 1;
      this.currentQuestions = this.questions.slice(this.currentNumber, this.currentNumber + 1);
      const catScore = (this.question1 + this.question2 + this.question3) / 3;
      console.log('final results: ', this.question1 + this.question2 + this.question3);
      this.finalResult.forEach((obj :any) => {
        if (obj.hasOwnProperty(this.currentCategory)) {
            obj[`${this.currentCategory}`] = catScore;
        }
    });
    console.log(this.finalResult);
    this.question1 = 0
    this.question2 = 0
    this.question3 = 0
    }
    if(this.currentNumber === this.questions.length){
      this.loadingFinish = true;
      const token = this.authService.getTokenObject();
      const id = token.id
      this.cvDataService.setSoftQuestions(id, this.finalResult).subscribe((response: any) => {
        this.router.navigate(['/profile/'+id])
      });
    }
  }
}
