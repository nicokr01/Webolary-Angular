import { Component, HostListener, input } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

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

  public screenTXT:string = "Login";

  constructor(public cookieService:CookieService, public router:Router){
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
    if(this.username != "" && this.password != ""){
      this.checkLoginData();
    }
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

  async checkLoginData(){
    this.loadingAnimation(true);
    this.loadingAnimationState = true;
    const url = 'https://api.webolary.com/?login=&username='+this.username+'&password='+this.password;
    await fetch(url)
    .then(response => response.json())
    .then(data => {
      this.loginStatus = data.login;
      let value = data.value;
      
      if(this.loginStatus == "success"){
        this.cookieService.set('username',value,30,"/");
        // this.router.navigate(["/home"]); -- slow because Angular executes Angular-Router commands before the if statement is checked !
        location.href = "/home";
      }
      else{
        this.inputPasswordStyle = {
          width: '100%', 
          'border-bottom': '1px solid red',
          color:'red'
        }

        this.inputUserStyle = {
          width: '100%', 
          'border-bottom': '1px solid red',
          color: 'red'
        }
        
        this.screenTXT = "Wrong Login data !";

        this.loadingAnimation(false);
        this.loadingAnimationState = false;
      }
    })
    .catch(error => {
      console.error('Error could not connect ERROR: \"webolaryConnect API 404\" ', error);
    });
  }
}

