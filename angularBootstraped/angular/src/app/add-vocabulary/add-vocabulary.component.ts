import { Component, ElementRef } from '@angular/core';
import { Auth } from '../Auth/auth';
import { CookieService } from 'ngx-cookie-service';
import { Theme } from '../Theme/theme';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { System } from '../WebolarySystem/system';

@Component({
  selector: 'app-add-vocabulary',
  templateUrl: './add-vocabulary.component.html',
  styleUrl: './add-vocabulary.component.css'
})
export class AddVocabularyComponent extends Auth{
  protected superGlobalStyle = "";
  protected displayMobile = false;
  protected inputActiveState:boolean = false;

  protected inputGerman:string = "";
  protected inputEnglisch:string = "";

  protected VocListTbody:SafeHtml = "";

  constructor(cookieService:CookieService, protected theme:Theme, protected elementRef:ElementRef, protected system:System, protected sanitizer:DomSanitizer){
    super(cookieService);

    /* set navList link*/
    localStorage.setItem("NavListItem","add vocabulary");
   /* set navList link*/
  }

  ngOnInit(){
    this.auth();

    /*Implement users theme*/
    if(this.theme.getMode() == "dark"){
      var darkDiv = this.elementRef.nativeElement.querySelector("#darkModeDiv");
      if(darkDiv){
        darkDiv.innerHTML = "<style>body{background-color:var(--darkmode)} #prg{background-color:rgba(0,0,0,0.65)} .textCircle{color:white} #word{color:white} .headlineDiv{color:white;} #first_part{color:white;} #rest{color:white;} #germanText{background-color:var(--darkmode);color:white} #englischText{background-color:var(--darkmode);color:white} #movingSpan{color:white} #c-p-3::before{background-color:rgba(0,0,0,0.65)} #p-v-3{color:white}  #c-p-2::before{background-color:rgba(0,0,0,0.65)} #p-v-2{color:white} #c-p-1::before{background-color:rgba(0,0,0,0.65)} #p-v-1{color:white} .circular-progress{background: conic-gradient(#7d2ae8 3.6deg,rgba(0,0,0,0.65)  0deg);} .analyse{color:white;}</style>";
      }
    }

    /* //// Implement users theme*/

    // Responsive
    if(window.innerWidth < 510){
      this.displayMobile = true;
    }
    // //// Responsive

    this.VocListTbody = this.sanitizer.bypassSecurityTrustHtml(this.system.getVocabularysAsTable());
  }

  /*Vocabulary list actions*/
  deleteVocFromList(id:number){
    alert("delete:" +id)
  }

  editVocFromList(id:number){
    alert("edit:"+id)
  }
  /* //// Vocabulary list actions*/

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

    inputAreaClickedSecond(){
      let div = document.getElementById("movingSpanSecond");
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
  
      let input = document.getElementById("englischText");
      input?.focus();
    }
}
