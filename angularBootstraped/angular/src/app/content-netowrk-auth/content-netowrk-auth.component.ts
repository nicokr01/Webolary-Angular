import { Component, HostListener, input, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { System } from '../WebolarySystem/system';
import CryptoJS from 'crypto-js';
import { log } from 'console';
import { User } from '../User/User';
import { DomSanitizer, SafeHtml, SafeUrl } from '@angular/platform-browser';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';

@Component({
  selector: 'app-content-netowrk-auth',
  templateUrl: './content-netowrk-auth.component.html',
  styleUrl: './content-netowrk-auth.component.scss'
})
export class ContentNetowrkAuthComponent {

  public dataLoaded:boolean = false;
  public loginStatus:any;
  public username:string = "";
  public password:string = "";
  public loadingAnimationState:boolean = false;

  public errAlert_wrongData:string = "errAlert_wrongData";
  public errAlert_wrongData_active:boolean = false;
  public errAlert_wrongData_Timestamp:any;

  public inputUserStyle:any = { width: '100%' };
  public inputPasswordStyle:any = {width: '100%'};

  public screenTXT:string = "Login CDN";

  protected formStyle:any = {};

  

  constructor(public cookieService:CookieService, public router:Router){
    // const interval = setInterval(() => {
    //   this.checkAlertTime();
    // }, 2000);
  }

  @ViewChildren('codeInput') inputs!: QueryList<ElementRef>;

  ngAfterViewInit() {
    this.inputs.forEach((input, index) => {
      const nativeElement = input.nativeElement as HTMLInputElement;

      nativeElement.addEventListener('input', () => {
        if (nativeElement.value.length === nativeElement.maxLength) {
          const nextInput = this.inputs.toArray()[index + 1];
          if (nextInput) {
            nextInput.nativeElement.focus();
          }
        }
      });

      nativeElement.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === "Backspace" && nativeElement.value === "") {
          const prevInput = this.inputs.toArray()[index - 1];
          if (prevInput) {
            prevInput.nativeElement.focus();
          }
        }

        if (e.key === "Enter" && index === this.inputs.length - 1) {
          // Die Funktion zum Senden des Codes aufrufen
          this.checkLoginData();
        }
      });
    });
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.code === 'Enter' || event.keyCode === 13) {
      this.enterClicked(event);
    }
  }

  enterClicked(event?: KeyboardEvent) {
    if(this.username != "" && this.password != ""){
      this.checkLoginData();
    }
  }



  ngOnInit(){
    
    this.dataLoaded = true;
    
    const inputUser = document.getElementById("inputUser");

    if(inputUser){
      inputUser?.focus();
    }
    else{
      console.error("Dom not accessible \n Exception Webolary-102: Dom not accessible, try a other browser");
    }
  }

  public checkAlertTime(){
    if(this.errAlert_wrongData_active){
      var actDate = Date.now();
     
      if(actDate-2800 >= this.errAlert_wrongData_Timestamp){
          var alert = document.getElementById(this.errAlert_wrongData);
          if(alert){
            alert.classList.add("AlertHidden");
          }
      }
    }
  }

  public loadingAnimation(action:boolean){
    let loadingAnimationDiv = document.getElementById("loadingAnimation");
    if(loadingAnimationDiv){
      if(action){
        loadingAnimationDiv.style.visibility="visible";
      }
      else{
        loadingAnimationDiv.style.visibility="hidden";
      }
      
    }
  }

  protected hoverOverLoginBTN(){
    const loginSPAN = document.getElementById("loginSPAN");
    const loginIMAGE = document.getElementById("loginIMAGE");

    setTimeout(() => {
      // loginSPAN!.style.transform="translateY(-20px)";
      loginSPAN!.style.display="none";
      loginIMAGE!.style.display="block";
      loginIMAGE?.classList.add("trR");
      loginIMAGE?.classList.add("trRSET");
    }, 200);
    
  }

  protected hoverOverLoginBTNLeave(){
    const loginSPAN = document.getElementById("loginSPAN");
    const loginIMAGE = document.getElementById("loginIMAGE");
   
    setTimeout(() => {
      // loginSPAN!.style.transform="translateY(-20px)";
      loginIMAGE!.style.display="none";
      loginSPAN!.style.display="block";
    }, 200);
  }

  async checkLoginData(){
    const codeValues = this.inputs.map(input => input.nativeElement.value).join('');

    if(codeValues.length < 8){
      this.inputs.forEach(input => {
        input.nativeElement.style.color = "red";
        input.nativeElement.style.border = "1px solid red";
      });
      return;
    }

    this.loadingAnimation(true);
    this.loadingAnimationState = true;
    const url = 'https://api.webolary.com/?loginCDN=&username='+this.username+'&password='+this.password+'&token='+codeValues;
    await fetch(url)
    .then(response => response.json())
    .then(data => {
      if(data.status == 'success'){
          location.reload();
      }
      else{
        this.loadingAnimation(false);
        this.loadingAnimationState = false;

        this.screenTXT = "Wrong data 😢";

        this.inputs.forEach(input => {
          input.nativeElement.style.color = "red";
          input.nativeElement.style.border = "1px solid red";
        });

        this.inputPasswordStyle = {
          color:"red",
          "border":"red 2px solid red"
        }

        this.inputUserStyle = {
          color:"red",
          "border":"red 2px solid red"
        }

      }
    })
    .catch(error => {
      console.error('Error could not connect ERROR: \"webolaryConnect API 404\" ', error);
    });
  }
}
