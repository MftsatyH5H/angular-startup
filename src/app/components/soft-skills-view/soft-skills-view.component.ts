import { Component, Input, OnInit } from '@angular/core';
import { CvDataService } from '../cv-data.service';

@Component({
  selector: 'app-soft-skills-view',
  standalone: true,
  imports: [],
  templateUrl: './soft-skills-view.component.html',
  styleUrl: './soft-skills-view.component.css'
})
export class SoftSkillsViewComponent implements OnInit{
  @Input() userObject: any
  @Input() techSkillsPercentage: any;
  @Input() totalScore: any;
  imgSrc: any
  currentChartChoice: string = 'softSkills'
  softSkillsPercentage: number = 0;
  facialRecognitionPercentage: number = 0;
  technicalSkillsPercentage: number = 61;
  totalPercentage: number = 0;
  constructor(private cvDataService: CvDataService){
  }
  
  ngOnInit(): void {
    console.log(this.techSkillsPercentage)
    this.technicalSkillsPercentage = Number(this.techSkillsPercentage);
    const totalFacialRecognitionScore = this.userObject.facialRecognition.reduce((sum: number, emotion: any) => {
      const newPercentage = sum + emotion.Percentage;
      return parseFloat(newPercentage.toFixed(1))
    }, 0);
    const softSkills = Object.values(this.userObject.softSkills);
    const softSkillsPercentage = softSkills.reduce((sum: number, skill: any) => {
      //im sorry again
      //@ts-ignore
      const value:any = Math.floor(parseFloat(Object.values(skill)[0].toFixed(1)) *10);
      return sum + value;
    }, 0);
    this.softSkillsPercentage = softSkillsPercentage;
    this.facialRecognitionPercentage = totalFacialRecognitionScore;
    const data = this.userObject.softSkills.reduce((acc: { [x: string]: any; }, currentObj: { [x: string]: any; }) => {
      const key = Object.keys(currentObj)[0];
      acc[key] = currentObj[key];
      return acc;
      }, {});
    const dataToSend = {
      data
    }
    let totalScore: any = (this.facialRecognitionPercentage + this.softSkillsPercentage + this.technicalSkillsPercentage) / 3;
    this.totalPercentage = Math.ceil(totalScore.toFixed(1)) as number;
    console.log(dataToSend);
    this.cvDataService.getChart(dataToSend).subscribe((response: any) => {
      this.imgSrc = `data:image/jpeg;base64,${response.image}`
    });
  }
  changeChartChoice(value: any){
    this.resetButtonChoices();
    this.currentChartChoice = value;
    const currentButton = document.getElementById(value);
    if(currentButton){
      currentButton.className = 'row selectedRowButton justify-content-between'
    }
    if(value === 'softSkills'){
      const softSkills = Object.values(this.userObject.softSkills);
      console.log('sadkaskfm',softSkills)
    const data = this.userObject.softSkills.reduce((acc: { [x: string]: any; }, currentObj: { [x: string]: any; }) => {
      const key = Object.keys(currentObj)[0];
      acc[key] = currentObj[key];
      return acc;
      }, {});
    const dataToSend = {
      data
    }
    console.log(dataToSend);
    this.cvDataService.getChart(dataToSend).subscribe((response: any) => {
      this.imgSrc = `data:image/jpeg;base64,${response.image}`
    });
    }
    if(value === 'facialRecognition'){
      const data = this.userObject.facialRecognition.reduce((acc: { [x: string]: any; }, currentObj: { Class: string | number; Percentage: any; }) => {
        acc[currentObj.Class] = currentObj.Percentage;
        return acc;
      }, {});
      const dataToSend = {
        data
      }
      console.log(dataToSend);
      this.cvDataService.getChart(dataToSend).subscribe((response: any) => {
        this.imgSrc = `data:image/jpeg;base64,${response.image}`
      });
    }
    if(value === 'TotalPercentage'){
      const data ={
        facial_recognition: this.facialRecognitionPercentage / 100,
        technical_skills: this.technicalSkillsPercentage / 100,
        soft_skills: this.softSkillsPercentage / 100
      }
      const dataToSend = {
        data
      }
      console.log(dataToSend);
      this.cvDataService.getChart(dataToSend).subscribe((response: any) => {
        this.imgSrc = `data:image/jpeg;base64,${response.image}`
      });
    }
  }
  getKey(obj: any): string {
    const key = Object.keys(obj)[0];
    return key.replaceAll('_',' ');
  }

  getValue(obj: any): number {
    //im so so sorry
    return Math.floor(parseFloat(obj[Object.keys(obj)[0]].toFixed(1)) * 100);
  }
  resetButtonChoices(){
    const skillsButton = document.getElementById('softSkills');
    if(skillsButton){
      skillsButton.className = 'row row-button justify-content-between'
    }
    const techButton = document.getElementById('techSkills');
    if(techButton){
      techButton.className = 'row row-button justify-content-between'
    }
    const facialButton = document.getElementById('facialRecognition');
    if(facialButton){
      facialButton.className = 'row row-button justify-content-between'
    }
    const totalButton = document.getElementById('TotalPercentage');
    if(totalButton){
      totalButton.className = 'row row-button justify-content-between'
    }
  }
}
