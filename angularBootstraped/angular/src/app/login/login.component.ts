import { Component, HostListener } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  public dataLoaded:boolean = false;
  public loginStatus:any;
  public username:string = "";
  public password:string = "";

  public errAlert_wrongData:string = "errAlert_wrongData";
  public errAlert_wrongData_active:boolean = false;
  public errAlert_wrongData_Timestamp:any;

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

  async checkLoginData(){
    this.loadingAnimation(true);
    const url = 'https://api.webolary.com/?login=&username='+this.username+'&password='+this.password;
    console.log(url);
    await fetch(url)
    .then(response => response.json())
    .then(data => {
      this.loginStatus = data.login;
      let value = data.value;
      
      if(this.loginStatus == "success"){
        this.cookieService.set('username',value,30,"/");
        this.router.navigate(["/home"]);
      }
      else{
        var alert = document.getElementById(this.errAlert_wrongData);
        if(alert){
          alert.classList.remove("AlertHidden");
          alert.style.display = "block";
          this.errAlert_wrongData_active = true;
          this.errAlert_wrongData_Timestamp = Date.now();
        }
        this.loadingAnimation(false);
      }
    })
    .catch(error => {
      console.error('Error could not connect ERROR: \"webolaryConnect API 404\" ', error);
    });
  }
}

