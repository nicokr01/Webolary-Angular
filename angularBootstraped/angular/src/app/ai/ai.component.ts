import { Component, ElementRef, HostListener, model } from '@angular/core';
import { Theme } from '../Theme/theme';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-ai',
  templateUrl: './ai.component.html',
  styleUrl: './ai.component.css'
})

export class AIComponent  {
    protected sizeOk = false;
    protected modeStyle ="";
    inputActiveState: boolean = false;
    input: string = "";
    protected boxBTNValue:SafeHtml;
    protected boxValue:SafeHtml = "";
    protected movingSpanText = "Search for a topic";
    protected superGlobalStyle = "";
    protected displayMobile = false;
    protected backgroundColor:string = "white";
    protected color:string = "white";

    constructor(protected theme:Theme, protected elementRef:ElementRef, protected sanitizer:DomSanitizer, protected cookieService:CookieService){
      // set value for sanitized DOM
      this.boxBTNValue = this.sanitizer.bypassSecurityTrustHtml("<p>Generate vocabulary list </p>");

      /* set navList link*/
      localStorage.setItem("NavListItem","Artificial Intelligence");
      /* set navList link*/
    }
    
    ngOnInit(){
      if(window.innerWidth > 850){this.sizeOk = true;}

      if(this.theme.getMode() == "dark"){
        this.modeStyle = "color:white;background-color:black;";
        const element = this.elementRef.nativeElement.querySelector("#DIV");
        if(element){
          element.style.backgroundColor = "black";
        }
        this.color = "black";
        this.backgroundColor = "rgb(242,242,242)";
      }
      else if(this.theme.getMode() == "white"){
        this.modeStyle = "color:black;background-color:white;";
      }

      // Responsive
    if(window.innerWidth < 510){
      this.displayMobile = true;
    }
    // //// Responsive
    }

    inputAreaClicked(){
      let div = this.elementRef.nativeElement.querySelector("#movingSpan");
      if(div){
        div.classList.remove("moveBottom")
        div.classList.add("moveTop");
        div.style.marginTop = "-7rem";
        if(this.theme.getMode() == "dark"){
          div.style.color ="rgb(100,100,100)";
        }
        else{
          div.style.color ="black";
        }
      }
      let input = this.elementRef.nativeElement.querySelector("#input");
      input.focus();
    
    }
    @HostListener('document:keydown', ['$event'])
    handleKeyDown(event: KeyboardEvent) {
      if (event.code === 'Enter' || event.keyCode === 13) {
          this.inputAction();
      }
    }

    onFocus(){
      console.log("focus action");
      this.inputActiveState = true;
    }
  
    onBlur(){
      this.inputActiveState = false;

        if(this.input == ""){
          let label = document.getElementById("movingSpan");
          label?.classList.remove("moveTop")
          label?.classList.add("moveBottom");
          label!.style.marginTop = "-4rem";
          label!.style.color = "black";
        }
    }

    async inputAction(){
        if(this.input.trim() == ""){
          this.movingSpanText = "Input is empty !";
          return;
        }
        else if(this.input.trim().length > 50){
          this.movingSpanText = "Only max. 50 characters are allowed !";
          return;
        }
        else{
          this.movingSpanText = "Searching for topic "+this.input;
        }

        this.boxBTNValue = this.sanitizer.bypassSecurityTrustHtml("<img src='../../assets/image/loadingInfinit.svg'><p class='ml-2' id='boxP'>Generate vocabulary list</p>");
        const boxBTN = this.elementRef.nativeElement.querySelector("#boxBTN");

        boxBTN.classList.add("flex");
        boxBTN.classList.add("pl-2");

        const topic = this.input;
        const URL = 'https://api.webolary.com/?AI=&topic='+topic+'&user='+this.cookieService.get("username");
        console.log(URL);
        await fetch(URL)
        .then(response => response.json())
        .then(data => {
            if(data.status == "success"){
                this.movingSpanText = "Status: success !";
                console.log(JSON.parse(data.content));
            }
            else{
              this.movingSpanText = "Sorry AI Request failed !";
            }
        })
        .catch(error => {
          console.error('Error could not connect! ERROR: \"webolaryConnect API 404\" ', error);
        });
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

