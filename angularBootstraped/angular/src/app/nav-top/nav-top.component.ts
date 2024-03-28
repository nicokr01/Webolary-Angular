import { Component, ElementRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import CryptoJS from 'crypto-js';
import { User } from '../User/User';
import { Theme } from '../Theme/theme';
import { withLatestFrom } from 'rxjs';

@Component({
  selector: 'app-nav-top',
  templateUrl: './nav-top.component.html',
  styleUrl: './nav-top.component.css'
})

export class NavTopComponent {
  protected username:string = "";
  protected usernameDiv:any;
  protected rankDiv:any;
  protected user:User;  
  protected darkmode:boolean = false;

  protected NavItem1 = localStorage.getItem("NavListItem");
  protected NavItem1_set:boolean = true;

  constructor(private cookie:CookieService, protected theme:Theme, protected elementRef:ElementRef){
    const encryptedValue = sessionStorage.getItem("User");
    if (encryptedValue) {
        const token = "c(j:iGBE)2RKae3OfxaT[4WG7By9'+m{e?)mfc3ez7Td9/RiT@";
        const decryptedBytes = CryptoJS.AES.decrypt(encryptedValue, token);
        const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
        this.user = JSON.parse(decryptedData);
    } else {
        this.user = new User("","",-2,"");
        console.log("sessionStorage is empty :(");
    }

    var reconstructedUserClass = new User("","",-2,"");
    reconstructedUserClass.updateObject(this.user);
    var rank = reconstructedUserClass.convertAccessString();
    if(!rank.match("error")){
      if(this.user.username.length > 6){
          var usernameCutted = this.user.username.substring(0,6);
          this.usernameDiv = "<p>"+usernameCutted+"..</p>";
      }
      else{
        this.usernameDiv = "<p>"+this.user.username+"</p>";
      }
      
      this.rankDiv = "<p>"+rank+"</p>";
    }
  } 

  ngOnInit(){
    // Check Theme

    if(this.theme.getMode() == "dark")
    { 
        this.darkmode = true;
        var div = this.elementRef.nativeElement.querySelector("#darkmode");
        var userD = this.elementRef.nativeElement.querySelector("#userD");
        var rankD = this.elementRef.nativeElement.querySelector("#rankD");
        if(div){
          div.innerHTML += "<style>#navForStyle{background: linear-gradient(45deg,#5210ce,#fffc);}</style>";
          if(userD){
            if(rankD){
              userD.style.color = "black";
              rankD.style.color ="black";
            }
          }
        }
    }
  }
}
