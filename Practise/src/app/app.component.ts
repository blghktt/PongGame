import { Component, OnInit } from '@angular/core';
import { interval} from 'rxjs';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Practise';
  timePeriod = 35;

  screenStroke:number  = 5;

  circleX: number;
  circleY:number;
  circleR:number;
  circleColor: string;
  screenWidth:number;
  screenHeight: number;
  directionX: number;
  directionY: number;
  screenWidthHalf: number;
  leftRacketY:number;
  rightRacketY: number;
  isGameOver:boolean;
  racketHeight:number;
  key:string;

  constructor() {
    this.screenWidth=600;
    this.screenHeight=400;
    this.screenWidthHalf = (this.screenWidth - (this.screenStroke * 2)) / 2;

    this.circleX = 300;
    this.circleY = 150;
    this.circleColor = "blue";
    this.circleR=5;

    this.directionX = (Math.floor(Math.random()*2) +1 ) *-1;
    this.directionY = Math.floor(Math.random()*2) +1;

    this.leftRacketY = 200;
    this.rightRacketY = 200;
    this.racketHeight = 20;

    this.isGameOver = false;

    this.key = "";
  }

  ngOnInit(): void {
    const subscription = interval(this.timePeriod);
    subscription.subscribe(val => this.setCoordinates());
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    this.key = event.key;
    this.keyPressedAndRacketMove();
  }
  
  keyPressedAndRacketMove(){
    if(this.key == "e" && this.leftRacketY > this.screenStroke){
        this.leftRacketY-=3;
    }
    if(this.key == "x" && this.leftRacketY + this.racketHeight + this.screenStroke < this.screenHeight){
      this.leftRacketY+=3;
    }
    if(this.key == "i" && this.rightRacketY > this.screenStroke){
      this.rightRacketY-=3;
    }
    if(this.key == "m" && this.rightRacketY + this.racketHeight + this.screenStroke < this.screenHeight){
      this.rightRacketY+=3;
    }
  }

  setCoordinates(){
    this.circleColor = (this.circleX + this.circleR > this.screenWidth / 2) ? "blue" : "red";
    
    if(((this.circleX + 6 == 550 || this.circleX + 6 == 551 || this.circleX + 6 == 552) && this.directionX > 0) || ((this.circleX - 8 == 50 || this.circleX - 8 == 49 || this.circleX - 8 == 48)  && this.directionX < 0 )){
      if(this.checkRacketReachCircle()){
        this.setDirectionX();
      }
    }
    this.IsGameOver();
    if(this.reachHorizontalWall()){
      this.SetDirectionY();
    }


    this.circleX += this.directionX;
    this.circleY += this.directionY;
  }

  checkRacketReachCircle(): boolean{
    if(this.circleX < this.screenWidth / 2){
      if(this.circleY > this.leftRacketY && this.circleY < this.leftRacketY+this.racketHeight){
        return true;
      }
    }
    if(this.circleX > this.screenWidth / 2){
      if(this.circleY > this.rightRacketY && this.circleY < this.rightRacketY+this.racketHeight){
        return true;
      }
    }
      return false;
  }

  IsGameOver(){
    if((this.circleX >= this.screenWidth-this.screenStroke)  || (this.circleX < this.screenStroke )){
      this.directionX = 0;
      this.directionY = 0;
      this.isGameOver = true;
    }
  }

  reachHorizontalWall(): boolean{
    if(this.circleY < 9 || this.circleY + 8 >= this.screenHeight){
      return true;
    }
    else{
      return false;
    }
  }

  SetDirectionY(){
    let newY = Math.floor(Math.random()*2) +1;
    if(newY * this.directionY > 0){
      this.directionY = newY * -1;
    }
    else{
      this.directionY = newY;
    }
  }

  setDirectionX(){
    let newX = Math.floor(Math.random()*2) +1;
    if(newX * this.directionX > 0){
      this.directionX = newX * -1;
    }
    else{
      this.directionX = newX;
    }
  }
}
