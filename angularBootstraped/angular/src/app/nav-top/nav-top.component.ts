import { Component, ElementRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import CryptoJS from 'crypto-js';
import { User } from '../User/User';
import { Theme } from '../Theme/theme';
import { System } from '../WebolarySystem/system';

@Component({
  selector: 'app-nav-top',
  templateUrl: './nav-top.component.html',
  styleUrl: './nav-top.component.scss'
})

export class NavTopComponent {
  protected username:string = "";
  protected usernameDiv:any;
  protected rankDiv:any;
  protected user:User;  
  protected email = "";
  protected points = "";
  protected darkmode:boolean = false;

  protected NavItem1 = localStorage.getItem("NavListItem");
  protected NavItem1_set:boolean = true;

  protected privateMenuStyle = "display:none";

  constructor(private cookie:CookieService, protected theme:Theme, protected elementRef:ElementRef, protected system:System){
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

    var reconstructedUserClass = new User("","",-1,"","","","","",false,false,"",false);
    reconstructedUserClass.updateObject(this.user);
    reconstructedUserClass.points = this.user.points;

    this.username = reconstructedUserClass.username;

    if(this.username.length > 14){
      this.username = this.username.substring(0,12)+"...";
    }

    this.email = reconstructedUserClass.email;

    if(this.email.length > 29){
      this.email = this.email.substring(0,27)+"...";
    }

    this.points = reconstructedUserClass.points;

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
          div.innerHTML += "<style>#navForStyle{background: linear-gradient(40deg,#5210ce,#fffc);}</style>";
          if(userD){
            if(rankD){
              userD.style.color = "black";
              rankD.style.color ="black";
            }
          }
        }
    }
  }

  showMenu(){
      this.privateMenuStyle = "position:fixed";
      localStorage.setItem("prMenu","active");
  }

  closePrivateMenu(){
    this.privateMenuStyle = "display:none";
    localStorage.setItem("prMenu","hidden");
  }
}
