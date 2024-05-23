import { Component, ElementRef } from '@angular/core';
import { Theme } from '../Theme/theme';
import { User } from '../User/User';
import CryptoJS from 'crypto-js';
import { System } from '../WebolarySystem/system';
import { sign } from 'crypto';
import { json } from 'express';

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
  protected styleBoxes = "background-color: white;border: 1px solid black;";
  protected alertText:string[] = ["",""];
  protected alertStyle:string[] =["display:none","display:none"];

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
  protected authMethod:string = "";
  // //// Form

  constructor(protected elementRef:ElementRef,protected theme:Theme, protected system:System){
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
      this.authMethod = this.reconstructedUserClass.two_FA_method;
      
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
        this.styleBoxes = "background-color: rgb(242,242,242);";
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

  // Form validation

  async publicSettingsSubmit(){
      this.usernameForm.trim();
      this.emailForm.trim();
      this.usernameForm.trim();
      this.lastnameForm.trim();

      let usernameCheck:boolean = this.system.isValidUsername(this.usernameForm);
      let emailCheck:boolean = this.system.isValidEmail(this.emailForm);

      let firstNameCheck:boolean = this.system.isValidName(this.firstnameForm);
      let lastnameCheck:boolean = this.system.isValidName(this.lastnameForm);

      let errorMessage: string[] = [];

      if(!usernameCheck){
        errorMessage.push("username");
      }
      if(!emailCheck){
        errorMessage.push("email");
      }
      if(!firstNameCheck){
        errorMessage.push("firstName");
      }
      if(!lastnameCheck){
        errorMessage.push("lastName");
      }

      //Client site validation
      if(errorMessage.length != 0){
        this.superGlobalStyle = "filter:blur(10px)";
        this.alertText[0] = "The following input field were not filled correctly: " + errorMessage.join(",");
        this.alertStyle[0] = "";
        return;
      }

      this.reconstructedUserClass.username = this.usernameForm;
      this.reconstructedUserClass.email = this.emailForm;
      this.reconstructedUserClass.firstname = this.firstnameForm;
      this.reconstructedUserClass.lastname = this.lastnameForm;
      
      let userAPI = JSON.stringify(this.transformUserForApi(this.reconstructedUserClass));
      const url = "https://api.webolary.com/?updateUser=&user="+userAPI+"&token="+this.system.cookieService.get("username");
      await fetch(url)
      .then(response => response.json())
      .then(data => {
        //Server side validation
          if(data.status == "success"){
            this.alertStyle[1] = "display:block";
            this.alertText[1] = "Your security settings have been updated successfully";
            this.superGlobalStyle = "filter:blur(10px)";
          }
          if(data.status != "success"){
            this.alertStyle[0] = "display:block";
            this.alertText[0] = data.message;
            this.superGlobalStyle = "filter:blur(10px)";
          }
      })
  }

  protected async securitySettingsSubmit(){
    this.reconstructedUserClass.emailLogin = this.emailLogin;
    this.reconstructedUserClass.two_FA = this.twoFA;
    this.reconstructedUserClass.two_FA_method = this.authMethod;
    this.reconstructedUserClass.session_login = this.sessionLogin;

    let userAPI = JSON.stringify(this.transformUserForApi(this.reconstructedUserClass));

    const url = "https://api.webolary.com/?updateUser=&user="+userAPI+"&token="+this.system.cookieService.get("username")+"&type=sec";

    this.alertText[0] = "";
    this.alertText[1] = "";

    await fetch(url)
    .then(response => response.json())
    .then(data => {
        if(data.status == "success"){
          this.alertStyle[1] = "display:block";
          this.alertText[1] = "Your security settings have been updated successfully";
          this.superGlobalStyle = "filter:blur(10px)";
        }
        if(data.status != "success"){
          this.alertText[0] = data.message;
          this.alertStyle[0] = "display:block";
          this.superGlobalStyle = "filter:blur(10px)";
        }
    })
  }

  public passwordChangeSubmit():void {

  }

  public closeAlert(index:number):void{
    this.alertText[index] = "";
    this.alertStyle[index] = "display: none";
    this.superGlobalStyle = "filter:none";
  }

  setAuthMethod(method:string){
    this.authMethod = method;
  }

  private transformUserForApi(user: User): any {
    return {
      ...user,
      emailLogin: user.emailLogin ? 1 : 0,
      two_FA: user.two_FA ? 1 : 0,
      session_login: user.session_login ? 1 : 0,
    };
  }

  // //// Form validation
}