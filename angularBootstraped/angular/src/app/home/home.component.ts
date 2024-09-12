import { Component, ElementRef, HostListener, Sanitizer, ViewChild} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Auth } from '../Auth/auth';
import { Theme } from '../Theme/theme';
import { System } from '../WebolarySystem/system';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { WebsocketService } from '../websocket.service';

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
  protected displayMobile = false;
  protected wordDiv = "loading ...";
  protected correctWord = "";
  protected btnSubmitText = "Compare";
  protected analyseDiv:SafeHtml = "";
  protected superGlobalStyle = "";

  constructor(cookieService:CookieService, protected theme:Theme, protected elementRef:ElementRef,protected system:System, private sanitizer:DomSanitizer,websocket:WebsocketService){
    super(cookieService,websocket);

    /* set navList link*/
    localStorage.setItem("NavListItem","pratice vocabulary");
   /* set navList link*/
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

    /*Implement users theme*/
    if(this.theme.getMode() == "dark"){
      var darkDiv = this.elementRef.nativeElement.querySelector("#darkModeDiv");
      if(darkDiv){
        darkDiv.innerHTML = "<style>.theme{color:white} body{background-color:var(--darkmode)} #prg{background-color:rgba(0,0,0,0.65)} .textCircle{color:white} #word{color:white} .headlineDiv{color:white;} #first_part{color:white;} #rest{color:white;} #germanText{background-color:var(--darkmode);color:white} #movingSpan{color:white} #c-p-3::before{background-color:rgba(0,0,0,0.65)} #p-v-3{color:white}  #c-p-2::before{background-color:rgba(0,0,0,0.65)} #p-v-2{color:white} #c-p-1::before{background-color:rgba(0,0,0,0.65)} #p-v-1{color:white} .circular-progress{background: conic-gradient(#7d2ae8 3.6deg,rgba(0,0,0,0.65)  0deg);} .analyse{color:white;}</style>";
      }
    }
    else{
      var darkDiv = this.elementRef.nativeElement.querySelector("#darkModeDiv");
      if(darkDiv){
        darkDiv.innerHTML = "<style>#movingSpan{color:black}</style>";
      }
    }
    /* //// Implement users theme*/

      // Responsive
      if(window.innerWidth < 510){
        this.displayMobile = true;
      }
      // //// Responsive


      /*Local integration*/
      if(this.system.GETchangeReferenceDetection()){
          // change detected
          if(this.system.GETchangeReferenceDetection() == "vocabularyListChanged"){
            this.system.resetUnitSession();
            this.system.DELETEchangeReferenceDetection();
          }
      }
      /* //// Local integration*/

      /* Webolary System integration*/
      if(this.nextVocabulary() == "finished"){
        this.btnSubmitText = "Practice again ?"
      }
      
     /* //// Webolary System integration*/
       
    }
  textAnimation(word:any){
     this.wordDiv = word;
  }

  nextVocabulary(){
    if(!this.system.checkDictionary()){
      this.wordDiv = "Insert vocabularys or select a unit";
    }
    else{
        var vocabulary = this.system.getRandomVocabulary();
        if(vocabulary == false){
          this.wordDiv = "Insert vocabularys or select a unit";
        }
        else if(vocabulary == "unit finished 😀"){
          this.wordDiv = "unit finished 😀";
          return "finished";
        }
        else{
            this.textAnimation(vocabulary[1]);
            this.correctWord = vocabulary[0];
        }
    }
    return "";
  }

  onFocus(){
    this.inputActiveState = true;
  }

  onBlur(){
    this.inputActiveState = false;

      if(this.input == ""){
        let label = document.getElementById("movingSpan");
        label?.classList.remove("moveTop")
        label?.classList.add("moveBottom");
        label!.style.marginTop = "-4rem";
      }
  }

  inputAreaClicked(){
    let div = document.getElementById("movingSpan");
    if(div){
      div.classList.remove("moveBottom")
      div.classList.add("moveTop");
      div.style.marginTop = "-7rem";
      if(this.theme.getMode() == "dark"){
        div.style.color ="white";
      }
      else{
        div.style.color ="black";
      }
      
    }

    let input = document.getElementById("germanText");
    input?.focus();
  }

  // bluring page is menu is active
  bodyClicked(){
    var v = localStorage.getItem("prMenu");
    if(v !== null && v == "active"){
        this.superGlobalStyle = "filter:blur(10px)";
        localStorage.removeItem("prMenu");
    }
    else if(v !== null && v == "hidden"){
      this.superGlobalStyle = "filter:none";
      localStorage.removeItem("prMenu");
    }
  }
  // //// bluring page


  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.code === 'Enter' || event.keyCode === 13) {
      this.compare();
    }
  }

  /*
    functionality System Frontend -v1.2.1

    including Animation handler
  */

    compare(){
      // if unit is over and user want to practice again
      if(this.btnSubmitText == "Practice again ?"){
        this.system.practiceUnitAgain();
        this.btnSubmitText = "Compare";
        this.analyseDiv = "";
        location.reload();
      }
     
      // if empty input return false;
      // if(this.input.trim() == ""){return false};

      this.analyseDiv = "";

      var res = this.system.checkInput(this.input,this.correctWord);

      if(res){
        this.analyseDiv = "Very good correct 😃"
        this.system.increaseCountCorrect();
        this.system.delteVocOfAvailableList(this.correctWord);
      }
      else{
        // santizer disable, because its a safe HTML Code no user interaction so scheiß auf XSS
        if(window.innerWidth > 800){
          this.analyseDiv = this.sanitizer.bypassSecurityTrustHtml("Wrong <div class='ml-3 mr-3 text-white bg-green-600 rounded-full pl-3 pr-3'>"+this.correctWord+"</div> is the correct solution!");
        }
        else{
          this.analyseDiv = this.sanitizer.bypassSecurityTrustHtml("Wrong - "+this.correctWord+" - is the correct solution!");
        }
       this.system.increaseCountWrong();
        if(this.input.trim() != ""){
          this.system.delteVocOfAvailableList(this.correctWord);
        }
      }
      this.input = "";


      this.system.circle_one(this.system.getProgress());
      this.system.circle_two(this.system.getCountCorrectPercent());
      this.system.circle_three(this.system.getCountWrongPercent());
        
      if(this.nextVocabulary() == "finished"){
          this.system.circle_one(100);
          this.btnSubmitText = "Practice again ?"
          this.analyseDiv = "";
          localStorage.removeItem("availableVocabularys");
          localStorage.setItem("CountCorrect","0");
          localStorage.setItem("CountWrong","-1");
      }

      return true;
    }
    /* //// end of System Frontent -v this->version*/
}
