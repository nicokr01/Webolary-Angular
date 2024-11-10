import { Component, ElementRef } from '@angular/core';
import { Theme } from '../Theme/theme';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-learn-mode',
  templateUrl: './learn-mode.component.html',
  styleUrl: './learn-mode.component.scss'
})
export class LearnModeComponent {
  protected displayMobile:boolean = false;
  protected superGlobalStyle = "";

  constructor(cookie:CookieService, protected elementRef:ElementRef,protected theme:Theme){}

  ngOnInit(){

    /*Implement users theme*/
  if(this.theme.getMode() == "dark"){
    var darkDiv = this.elementRef.nativeElement.querySelector("#darkModeDiv");
    if(darkDiv){
      darkDiv.innerHTML = "<style>.theme{color:white} body{background-color:var(--darkmode)} #prg{background-color:rgba(0,0,0,0.65)} </style>";
    }
  }
  else{
    var darkDiv = this.elementRef.nativeElement.querySelector("#darkModeDiv");
    if(darkDiv){
      darkDiv.innerHTML = "<style>.theme{color:black}";
    }
  }

  /* //// Implement users theme*/

  /* set navList link*/
  localStorage.setItem("NavListItem","Webolary Learning");
  /* set navList link*/

  // Responsive
  if(window.innerWidth < 510){
    this.displayMobile = true;
  }
  // //// Responsive
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
}
