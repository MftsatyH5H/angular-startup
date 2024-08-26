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
  imgSrc: any
  currentChartChoice: string = 'softSkills'
  softSkillsPercentage: number = 0;
  facialRecognitionPercentage: number = 0;
  technicalSkillsPercentage: number = 61;
  totalPercentage: number = 0;
  constructor(private cvDataService: CvDataService){
  }
  
  ngOnInit(): void {
    this.userObject.facialRecognition.forEach((item: any) => {
      this.facialRecognitionPercentage = this.facialRecognitionPercentage + item.Percentage;
      this.facialRecognitionPercentage = parseFloat(this.facialRecognitionPercentage.toFixed(1));
    })
    const softSkills = Object.values(this.userObject.softSkills);
    console.log('sadkaskfm',softSkills)
    softSkills.forEach((obj: any) => {
      const value = Object.values(obj)[0];
      //@ts-ignore
      this.softSkillsPercentage = this.softSkillsPercentage + value;
      this.softSkillsPercentage = parseFloat(this.softSkillsPercentage.toFixed(1));
    });
    this.softSkillsPercentage = this.softSkillsPercentage * 10
    const data = this.userObject.softSkills.reduce((acc: { [x: string]: any; }, currentObj: { [x: string]: any; }) => {
      const key = Object.keys(currentObj)[0];
      acc[key] = currentObj[key];
      return acc;
      }, {});
    const dataToSend = {
      data
    }
    this.technicalSkillsPercentage = this.userObject.techSkills;
    const percentage = (this.technicalSkillsPercentage + this.softSkillsPercentage + this.facialRecognitionPercentage) / 3;
    this.totalPercentage = parseFloat(percentage.toFixed(1))
    console.log(dataToSend);
    this.cvDataService.getChart(dataToSend).subscribe((response: any) => {
      this.imgSrc = `data:image/jpeg;base64,${response.image}`
    });
    this.technicalSkillsPercentage = parseFloat(this.technicalSkillsPercentage.toFixed(1));
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
    //im sorry
    return parseFloat(obj[Object.keys(obj)[0]].toFixed(1)) *100;
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
