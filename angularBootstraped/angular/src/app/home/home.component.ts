import { Component, ElementRef, ViewChild} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Auth } from '../Auth/auth';
import { Theme } from '../Theme/theme';
import { HttpClient, HttpHandler } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})

export class HomeComponent extends Auth{
  protected input:string = "";
  protected inputActiveState:boolean = false;
  protected access:number = -2;
  protected test = 10;

  constructor(cookieService:CookieService, protected theme:Theme, protected elementRef:ElementRef){
    super(cookieService);
    
  }

  ngOnInit(){
    /*Aufareisen & block unauthorized actions => bann Page*/
    this.auth();
    /* Nimma aufareisen */ 

    /* Input span move animation check */
    // setInterval(() => {
    //   this.checkMovingSpanPosition();
    // },200);
    /* //// Input span move animation check */  
    
    if(this.theme.getMode() == "dark"){
      // this.loadStyle("abc.css");
    }
  }

  onFocus(){
    this.inputActiveState = true;
  }

  onBlur(){
    this.inputActiveState = false;
  }

  inputAreaClicked(){
    let div = document.getElementById("movingSpan");
    if(div){
      div.classList.remove("moveBottom")
      div.classList.add("moveTop");
      div.style.marginTop = "-7rem";
      div.style.color ="black";
    }

    let input = document.getElementById("germanText");
    input?.focus();
  }

  // checkMovingSpanPosition(){
  //   let div = document.getElementById("movingSpan");
  //   if(div){
  //     if(div.style.marginTop == "-7rem" && this.input.length < 1){
  //         if(!this.inputActiveState){
  //           div.classList.remove("moveTop");
  //           div.classList.add("moveBottom");
  //           div.style.marginTop = "-4rem";
  //           div.style.color ="rgb(156,163,175)";
  //         }
  //     }
  //   }
  // }

  // Cirlce
  circle_one(end:any){
    let circularProgress = document.getElementById("c-p-1");
    let progressValue_e = document.getElementById("p-v-1");
    var progressValue:string = "";
    if(progressValue_e?.textContent?.toString != undefined){
      progressValue = progressValue_e?.textContent;
    }
    
    let start = parseInt(progressValue); 
    if(end != parseInt(progressValue)){
      let progressStartValue = start,   
    progressEndValue = end,    
    speed = 50;
    
    var betweenValue;
    var rotation;
    if(end > start){
        rotation = "-";
        betweenValue = end - start;
    }
    else{
      rotation = "+";
    }
  
  let progress = setInterval(() => {
    progressStartValue++;
  
    if(progressValue_e){
      progressValue_e.textContent = `${progressStartValue}%`;
    }
  
    if(circularProgress){
      circularProgress.style.background = `conic-gradient(#7d2ae8 ${progressStartValue * 3.6}deg, #2B2F33 0deg)`;
    }
  
    if(progressStartValue == progressEndValue){
        clearInterval(progress);
    }    
  }, speed);
    }
}


circle_two(end:any){
  let circularProgress = document.getElementById("c-p-2");
  let progressValue_e = document.getElementById("p-v-2");
    var progressValue:string = "";
    if(progressValue_e?.textContent?.toString != undefined){
      progressValue = progressValue_e?.textContent;
    }
    
    let start = parseInt(progressValue); 

if(end != start){
  let progressStartValue = start;    
  var progressEndValue = end,    
  speed = 5;

  if(end < progressStartValue){
  progressStartValue = 0;
  }

  let progress = setInterval(() => {
  progressStartValue++;

  if(progressValue_e){
    progressValue_e.textContent = `${progressStartValue}%`
  }
  if(circularProgress){
    circularProgress.style.background = `conic-gradient(green ${progressStartValue * 3.6}deg, #2B2F33 0deg)`
  }
    
  if(progressStartValue == progressEndValue){
      clearInterval(progress);
  }    
  }, speed);
}

}


circle_three(end:any){
  let circularProgress = document.getElementById("c-p-3");
  let progressValue_e = document.getElementById("p-v-3");
    var progressValue:string = "";
      if(progressValue_e?.textContent?.toString != undefined){
        progressValue = progressValue_e?.textContent;
      }
      
      let start = parseInt(progressValue); 
      if(end != start){
      let progressStartValue = start;    
      var progressEndValue = end,    
      speed = 5;

      if(end < progressStartValue){
        progressStartValue = 0;
      }

      let progress = setInterval(() => {
      progressStartValue++;

      if(progressValue_e){
        progressValue_e.textContent = `${progressStartValue}%`
      }
      
      if(circularProgress){
        circularProgress.style.background = `conic-gradient(red ${progressStartValue * 3.6}deg, #2B2F33 0deg)`
      }

      if(progressStartValue == progressEndValue){
          clearInterval(progress);
      }    
      }, speed); 
  }
}

  // //// Circle



  /*
    functionality System Frontend -v1.2.1

    including Animation handler
  */

    compare(){

      this.test+=10;
      if(this.test >= 80){
        this.test = 10;
      }

      this.circle_three(this.test);
    }
    /* //// end of System Frontent -v this->version*/
}
