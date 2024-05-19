import { Component, ElementRef } from '@angular/core';
import { Theme } from '../Theme/theme';
import { User } from '../User/User';
import CryptoJS from 'crypto-js';

@Component({
  selector: 'app-usersettings',
  templateUrl: './usersettings.component.html',
  styleUrl: './usersettings.component.css'
})
export class UsersettingsComponent {
  protected superGlobalStyle = "";
  protected displayMobile = false;
  protected inputActiveState:boolean = false;
  protected user:User;  
  protected reconstructedUserClass:User;

  // FORM
  protected usernameForm:string = "";
  protected emailForm:string = "";
  protected firstnameForm:string = "";
  protected lastnameForm:string = "";

  protected emailLogin:boolean;
  protected twoFA:boolean;
  protected sessionLogin:boolean;

  protected authOptionEmail:boolean = false;
  protected authOptionToken:boolean = false;

  // //// Form

  constructor(protected elementRef:ElementRef,protected theme:Theme){
        /* set navList link*/
        localStorage.setItem("NavListItem","User Settings");
        /* set navList link*/

        /*Load Data*/
      const encryptedValue = sessionStorage.getItem("User");
      if (encryptedValue) {
          const token = "c(j:iGBE)2RKae3OfxaT[4WG7By9'+m{e?)mfc3ez7Td9/RiT@";
          const decryptedBytes = CryptoJS.AES.decrypt(encryptedValue, token);
          const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
          this.user = JSON.parse(decryptedData);
      } else {
          this.user = new User("","",-1,"","","","","",false,false,"",false);
          console.log("sessionStorage is empty :(");
      }

      this.reconstructedUserClass = new User("","",-1,"","","","","",false,false,"",false);
      this.reconstructedUserClass.updateObject(this.user);

      this.emailLogin = this.reconstructedUserClass.emailLogin;
      this.twoFA = this.reconstructedUserClass.two_FA;
      this.sessionLogin = this.reconstructedUserClass.session_login;

       // Insert Data into UI
      this.usernameForm = this.reconstructedUserClass.username;
      this.emailForm = this.reconstructedUserClass.email;
      this.firstnameForm = this.reconstructedUserClass.firstname;
      this.lastnameForm = this.reconstructedUserClass.lastname;
      
      if(this.reconstructedUserClass.two_FA_method == "email"){
        this.authOptionEmail = true;
      }
      else if(this.reconstructedUserClass.two_FA_method == "token"){
        this.authOptionToken = true;
      }
      /* //// Load Data*/
  }
  
  ngOnInit(){
    /*Implement users theme*/
    if(this.theme.getMode() == "dark"){
      var darkDiv = this.elementRef.nativeElement.querySelector("#darkModeDiv");
      if(darkDiv){
        darkDiv.innerHTML = "<style>.theme{color:white} body{background-color:var(--darkmode)} #prg{background-color:rgba(0,0,0,0.65)} .textCircle{color:white} #word{color:white} .headlineDiv{color:white;} #first_part{color:white;} #rest{color:white;} #germanText{background-color:var(--darkmode);color:white} #englischText{background-color:var(--darkmode);color:white} #movingSpan{color:white} #c-p-3::before{background-color:rgba(0,0,0,0.65)} #p-v-3{color:white}  #c-p-2::before{background-color:rgba(0,0,0,0.65)} #p-v-2{color:white} #c-p-1::before{background-color:rgba(0,0,0,0.65)} #p-v-1{color:white} .circular-progress{background: conic-gradient(#7d2ae8 3.6deg,rgba(0,0,0,0.65)  0deg);} .analyse{color:white;} #h1{color:white}</style>";
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