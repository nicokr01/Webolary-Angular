import { Component, ElementRef } from '@angular/core';
import { Auth } from '../Auth/auth';
import { CookieService } from 'ngx-cookie-service';
import { Theme } from '../Theme/theme';
import e, { response } from 'express';
import { Lexer } from '@angular/compiler';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrl: './community.component.css'
})
export class CommunityComponent extends Auth {
    protected displayMobile:boolean = false;
    protected superGlobalStyle = "";
    protected allUnits:any;
    protected searchUnits:any;
    protected search_input:string = "";

    constructor(cookie:CookieService, protected elementRef:ElementRef,protected theme:Theme){
      super(cookie);
    }

    ngOnInit(){
      this.auth();

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

    // Responsive
    if(window.innerWidth < 510){
      this.displayMobile = true;
    }
    // //// Responsive

    this.fetchAllUnits();
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


        /*Fetch All Units from API*/
        async fetchAllUnits() {
          const URL = "https://webolary.com/API/?getAllpublicUnits=";
          try {
            const response = await fetch(URL);
            const data = await response.json(); 
            this.allUnits = data;
            this.searchUnits = data;
          
          } catch (error) {
            console.error('Error could not connect ERROR: \"webolaryConnect API 404\" ', error);
          }
        }
        /* //// Fetch All Units from API*/



        /* CHECK Search input */
        protected checkInput():void{
            if(this.search_input == ""){this.searchUnits = this.allUnits}

            let searchedUnitList: any [] = [];
            for(let unit of this.allUnits){
              let name:string = unit[2];

              if (!searchedUnitList.includes(unit) && name.match(this.search_input)) {
                searchedUnitList.push(unit);
            }
            }

            this.searchUnits = searchedUnitList;
        }

         /* //// CHECK Search input */
}
