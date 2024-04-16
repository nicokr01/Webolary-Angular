import { Component, input, numberAttribute } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  protected usernameInput:string = "";
  protected passwordInput:string = "";
  
  floatLabel(ID:number){
    let label;
  
    if(ID == 1){
      label = document.getElementById("floatingLabel1");

      if(label){
        label?.classList.remove("floatBack");
        label?.classList.add("useFloating");
        label!.style.top = "18.99rem";
        label!.style.fontSize ="1.5rem";
        label!.style.left ="29%";
        label!.style.backgroundColor = "white";
        let input = document.getElementById("usernameInput");
        input?.focus();
      }
    }
    else if(ID == 2){      
      label = document.getElementById("floatingLabel2");

      if(label){
        label?.classList.remove("floatBackPaswd");
        label?.classList.add("useFloatingPaswd");
        label!.style.top = "29.205rem";
        label!.style.fontSize ="1.5rem";
        label!.style.left ="29%";
        label!.style.backgroundColor = "white";
        let input = document.getElementById("passwordInput");
        input?.focus();
      }
    }

    
  }

  blurInput(ID:number){
    let label;
    if(ID == 1 && this.usernameInput == ""){
      label = document.getElementById("floatingLabel1");

      if(label){
        label?.classList.remove("useFloating");
        label?.classList.add("floatBack");
        label!.style.top = "21rem";
        label!.style.fontSize ="2rem";
        label!.style.left ="30%";
        label!.style.backgroundColor = "none";
      }
    }
    else if(ID == 2 && this.passwordInput == ""){
      label = document.getElementById("floatingLabel2");
      label?.classList.remove("useFloatingPaswd");
      label?.classList.add("floatBackPaswd");
      label!.style.top = "31.205rem";
      label!.style.fontSize ="2rem";
      label!.style.left ="30%";
      label!.style.backgroundColor = "none";
    }
    

  }
}
