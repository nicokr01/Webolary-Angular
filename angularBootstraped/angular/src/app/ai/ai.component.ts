import { Component, ElementRef, HostListener, model } from '@angular/core';
import { Theme } from '../Theme/theme';

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

    constructor(protected theme:Theme, protected elementRef:ElementRef){}
    
    ngOnInit(){
      if(window.innerWidth > 850){this.sizeOk = true;}

      if(this.theme.getMode() == "dark"){
        this.modeStyle = "color:white;background-color:black;";
        const element = this.elementRef.nativeElement.querySelector("#DIV");
        if(element){
          element.style.backgroundColor = "black";
        }
      }
      else if(this.theme.getMode() == "white"){
        this.modeStyle = "color:black;background-color:white;";
      }
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

    inputAction(){
        alert("perform API request");
      
    }
}

