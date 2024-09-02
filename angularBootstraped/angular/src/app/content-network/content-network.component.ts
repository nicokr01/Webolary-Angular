import { Component, ElementRef, HostListener } from '@angular/core';
import { Theme } from '../Theme/theme';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-content-network',
  templateUrl: './content-network.component.html',
  styleUrl: './content-network.component.css'
})
export class ContentNetworkComponent {
  protected displayMobile:boolean = false;
  protected superGlobalStyle = "";
  protected FileSystem:any = {};
  protected HeadObjs:any = {};

  constructor(protected cookie:CookieService, protected elementRef:ElementRef,protected theme:Theme){}

  ngOnInit(){
    this.getData();

    /*Implement users theme*/
  if(this.theme.getMode() == "dark"){
    var darkDiv = this.elementRef.nativeElement.querySelector("#darkModeDiv");
    if(darkDiv){
      darkDiv.innerHTML = "<style>.theme{color:white} body{background-color:var(--darkmode)} #prg{background-color:rgba(0,0,0,0.65)} .headOBJ{background-color: rgb(29,36,40);} .category{border: 1.5px solid white;} .subject{background-color: rgb(39,46,50);} .subject:hover{background-color: rgb(55,62,66);}</style>";
    }
  }
  else{
    var darkDiv = this.elementRef.nativeElement.querySelector("#darkModeDiv");
    if(darkDiv){
      darkDiv.innerHTML = "<style>.theme{color:black} .headOBJ{background-color:rgb(242, 242, 242);} .category{border: 1.5px solid black;} .subject{background-color: rgb(232,232,232);} .subject:hover{background-color: rgb(225,225,225);}";
    }
  }

  /* //// Implement users theme*/

  /* set navList link*/
  localStorage.setItem("NavListItem","Webolary Content Network");
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

    async getData(){
      const url = 'https://api.webolary.com/?CDN=&token='+this.cookie.get("username");
      console.log(url);
      await fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.FileSystem = data;
        this.HeadObjs = Object.keys(data);
        console.log(this.HeadObjs);
      })
      .catch(error => {
        console.error('Error could not connect ERROR: \"webolaryConnect API 404\" ', error);
      });
    }
}
