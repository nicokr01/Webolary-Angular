import { Component, HostListener, input, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { System } from '../WebolarySystem/system';
import CryptoJS from 'crypto-js';
import { log } from 'console';
import { User } from '../User/User';
import { DomSanitizer, SafeHtml, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements AfterViewInit{
  public dataLoaded:boolean = false;
  public loginStatus:any;
  public username:string = "";
  public mail:string = "";
  public loadingAnimationState:boolean = false;
  public continueButton:SafeHtml = "continue";
  public BTNdisable:boolean = true;

  public errAlert_wrongData:string = "errAlert_wrongData";
  public errAlert_wrongData_active:boolean = false;
  public errAlert_wrongData_Timestamp:any;

  public inputUserStyle:any = { width: '100%' };
  public inputPasswordStyle:any = {width: '100%'};
  public secondInputDivStyle:any = {"display": "block"};
  public formStyle:any = {};

  public screenTXT:string = "Register";
  public emailTXT:string = "Enter your E-Mail";
  public usernameTXT:string = "Choose a Username";

  public registerCheck:boolean = false;
  public namesCheck:boolean = false;
  private registerCheckData:any = {};
  private registerNameData:any = {};
  private codeInput:boolean = false;
  private emailUserInput:string = "";
  protected loadingAnimationURL:SafeUrl = "../../assets/image/loading-spinner.svg";
  private codeSentToAPIStatus:boolean = false;
  protected firstInputType = "text";
  protected secondInputType = "text";
  protected setUpPassword:boolean = false;
  private registrationSuccessfull:boolean = false;

  constructor(public cookieService:CookieService, public router:Router, protected system:System, protected saitizer:DomSanitizer) {
    // const interval = setInterval(() => {
    //   this.checkAlertTime();
    // }, 2000);

  }

  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.code === 'Enter' || event.keyCode === 13) {
      this.enterClicked(event);
    }
  }

  enterClicked(event?: KeyboardEvent) {
    this.checkData();
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
          // Alle Werte aus den Eingabefeldern sammeln
          const codeValues = this.inputs.map(input => input.nativeElement.value).join('');
          
          // Die Funktion zum Senden des Codes aufrufen
          this.sendCodeToAPI(codeValues);
        }
      });
    });
  }

  protected loadUserInputData(){
    
    var encryptedValue = sessionStorage.getItem("RegisterCheck");
    if (encryptedValue) {
        const token = "c(j:iGBE)2RKae3OfxaT[4WG7By9'+m{e?)mfc3ez7Td9/RiT@";
        const decryptedBytes = CryptoJS.AES.decrypt(encryptedValue, token);
        const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
        this.registerCheckData = JSON.parse(decryptedData);
        console.log(JSON.parse(decryptedData));
    } else {
        console.error("Browser storage manipulated !");
        this.screenTXT = "Error occurred";

        const interval = setInterval(() => {
            location.href = "/register";
          }, 2000);
    }

    encryptedValue = sessionStorage.getItem("NamesCheck");
    if (encryptedValue) {
        const token = "c(j:iGBE)2RKae3OfxaT[4WG7By9'+m{e?)mfc3ez7Td9/RiT@";
        const decryptedBytes = CryptoJS.AES.decrypt(encryptedValue, token);
        const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
        this.registerNameData = JSON.parse(decryptedData);
        console.log(JSON.parse(decryptedData));
    } else {
        console.error("Browser storage manipulated !");
        this.screenTXT = "Error occurred";

        const interval = setInterval(() => {
            location.href = "/register";
          }, 2000);
    }
  }

  private async sendCodeToAPI(code:string){
      if(this.codeSentToAPIStatus){return;}

      this.codeSentToAPIStatus = true;
      this.loadUserInputData();
      let url;

      if(this.registerNameData.firstname.trim() == ""){
        url = 'https://api.webolary.com/?registerUser=&email='+this.registerCheckData.mail+'&username='+this.registerCheckData.username+'&code='+code;
      }
      else{
        url = 'https://api.webolary.com/?registerUser=&email='+this.registerCheckData.mail+'&username='+this.registerCheckData.username+'&firstname='+this.registerNameData.firstname+'&lastname='+this.registerNameData.lastname+'&code='+code;
      }

      console.log(url);
    await fetch(url)
    .then(response => response.json())
    .then(data => {
      if(data.status == "success"){
        //registration successful
        // create Password
        this.formStyle = {display:"none"};
        this.screenTXT = "Setup Password";
        this.inputUserStyle = {display:"block"};
        this.inputPasswordStyle = {display:"block"};
        this.secondInputDivStyle = {display:"block"};
        this.emailTXT = "Enter a safe password";
        this.usernameTXT = "Confirm Password";
        this.continueButton = "setup";
        this.firstInputType = "password";
        this.secondInputType = "password";
        this.setUpPassword = true;
      }
      else{
        this.screenTXT = "Code incorrect !";
        this.continueButton = "create account"
        this.inputs.forEach(input => {
          input.nativeElement.style.color = "red";
          input.nativeElement.style.border = "1px solid red";
        });
      }
    })
    .catch(error => {
      console.error('Error could not connect ERROR: \"webolaryConnect API 404\" ', error);
    });


  }

  ngOnInit(){
    if(this.cookieService.check("username")){
      location.href = "/home";
    }
    else{
        this.dataLoaded = true;
    }

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

  protected optionalData(){
    this.usernameTXT = "Your lastname (optional)";
    this.emailTXT = "Your firstname (optional)";
    this.screenTXT = "Data about you";
    this.continueButton = "Continue";

    this.mail = "";
    this.username ="";
  }

  protected checkNames():boolean {
    //method to check if firstname and lastnames match criteria
      return this.system.isValidName(this.username) && this.system.isValidName(this.mail);
  }

  protected checkRegisterCheck():boolean{
    //method to check if username and email match criteria
    return this.system.isValidEmail(this.mail) && this.system.isValidUsername(this.username);
  }

  protected inputStatusChangeUser(){
    this.inputUserStyle = {
      width: '100%', 
      'border-bottom': '1px solid red',
      color: 'red'
    }
  }

  protected inputStatusChangePassword(){
    this.inputPasswordStyle = {
      width: '100%', 
      'border-bottom': '1px solid red',
      color: 'red'
    }
  }

  protected inputStatusChangeUserDefault(){
    this.inputUserStyle = {
      width: '100%', 
      'border-bottom': '1px solid black',
      color: 'black'
    }
  }

  protected inputStatusChangePasswordDefault(){
    this.inputPasswordStyle = {
      width: '100%', 
      'border-bottom': '1px solid black',
      color:'black'
    }
  }

  async checkData(){
    this.continueButton = this.saitizer.bypassSecurityTrustHtml("<img style='height:100%;margin-left:42.5%' src="+this.loadingAnimationURL+">");
    this.username = this.username.trim();
    this.mail = this.mail.trim();

    if(this.registerCheck){
      //username and email have already been checked, firstname and lastname check ->
      if(this.checkNames() || (this.username.trim() == "" && this.mail.trim() == "")){
          if(this.codeInput){
            if(this.setUpPassword){
              if(this.registrationSuccessfull){location.href = "/login";}
              // this.mail is firstInputField and this.username second input field !
              if(this.mail != this.username){
                  this.inputUserStyle = {
                    width: '100%', 
                    'border-bottom': '1px solid red',
                    color: 'red',
                    display:"block"
                  }
                  this.inputPasswordStyle = {
                    width: '100%', 
                    'border-bottom': '1px solid red',
                    color: 'red',
                    display:"block"
                  }
                  this.continueButton = "setup";
                  return;
              }
              const url = 'https://api.webolary.com/?setupPassword=&email='+this.registerCheckData.mail+'&username='+this.registerCheckData.username+'&KEY=685F6DB512F7E33F4B981FFE38C7A&password='+this.mail;
            
              await fetch(url)
              .then(response => response.json())
              .then(data => {
                if(data.status == "success"){
                    this.registrationSuccessfull = true;
                    this.screenTXT = "Registration successful";

                    this.inputUserStyle = {
                      display:"none"
                    }
                    this.inputPasswordStyle = {
                      display:"none"
                    }
                    this.secondInputDivStyle = {
                       "display" : "none"
                    }

                    this.continueButton = "Login now";
                    setTimeout(() => {
                        this.router.navigate(['/login']);
                    }, 2200);
                }
                else{
                  this.screenTXT = "Error occured !";
                  this.continueButton = "setup";
                }
              })
              .catch(error => {
                console.error('Error could not connect ERROR: \"webolaryConnect API 404\" ', error);
              });
            }
            else{
              //codeInput
              this.sendCodeToAPI(this.inputs.map(input => input.nativeElement.value).join(''));
            }
          }
          else{
            const token = "c(j:iGBE)2RKae3OfxaT[4WG7By9'+m{e?)mfc3ez7Td9/RiT@";
            const value = JSON.stringify({'lastname':this.username , 'firstname':this.mail }); 
            const encryptedData = CryptoJS.AES.encrypt(value, token).toString();
            sessionStorage.setItem("NamesCheck", encryptedData);
            this.inputStatusChangePasswordDefault();
            this.inputStatusChangeUserDefault();
            
            //Sending Email
            const url = 'https://api.webolary.com/?mailRequest=&KEY=5C321EF7B848C8FF1F591CD79B5FA&email='+this.emailUserInput;
            
            await fetch(url)
            .then(response => response.json())
            .then(data => {
              if(data.status == "success"){
                    this.screenTXT = "Verify Email";
                    this.emailTXT = "Enter code sent via email";
                    this.secondInputDivStyle = {display:"none"};  
                    this.formStyle = {display:"block"};
          
                    this.continueButton = "create account";
                    this.codeInput = true;
              }
            })
            .catch(error => {
              console.error('Error could not connect ERROR: \"webolaryConnect API 404\" ', error);
            });

            return;
          }
      }
      else{
        this.inputStatusChangeUser();
        this.inputStatusChangePassword();
      }

      return;
    }
    else{
      this.checkRegisterCheck();
    }


    // TESTING until API not stable ->
    // this.optionalData();

    // this.loadingAnimation(true);
    // this.loadingAnimationState = true;

    const url = 'https://api.webolary.com/?registerCheck=&username='+this.username+'&mail='+this.mail;
    await fetch(url)
    .then(response => response.json())
    .then(data => {
      if(data.status == "success"){
        this.registerCheck = true;

        const token = "c(j:iGBE)2RKae3OfxaT[4WG7By9'+m{e?)mfc3ez7Td9/RiT@";
        const value = JSON.stringify({'username':this.username , 'mail':this.mail }); 
        const encryptedData = CryptoJS.AES.encrypt(value, token).toString();
        sessionStorage.setItem("RegisterCheck", encryptedData);

        this.inputStatusChangeUserDefault();
        this.inputStatusChangePasswordDefault();

        this.emailUserInput = this.mail;

        this.optionalData();
      }
      else{
        console.error("registerCheck API returned error \n Error: "+ data.message);
        
        this.inputStatusChangeUser();
        this.inputStatusChangePassword();

        this.screenTXT = "Invalid data !";
        this.continueButton = "try again";
      }
    })
    .catch(error => {
      console.error('Error could not connect ERROR: \"webolaryConnect API 404\" ', error);
    });
  }
}
