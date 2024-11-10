import { Component, ElementRef } from '@angular/core';
import { Theme } from '../Theme/theme';
import { DomSanitizer } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../User/User';
import CryptoJS from 'crypto-js';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})


export class AdminPanelComponent{
  protected movingSpanText = "Search for a topic";
  protected superGlobalStyle = "";
  protected displayMobile = false;
  protected backgroundColor:string = "white";
  protected color:string = "white";
  protected sizeOk = false;
  protected modeStyle ="";
  protected request:any;
  protected requestCount = 0;
  private intervalId: any;
  protected user:User;

  //protected user:User;

  userStatuses = {
    // String -- Boolean
  };
  

  constructor(protected theme:Theme, protected elementRef:ElementRef, protected sanitizer:DomSanitizer, protected cookieService:CookieService, protected websocket:WebsocketService){
    /* set navList link*/
    localStorage.setItem("NavListItem","Admin Panel");
    /* set navList link*/

    //Fetch Data
    this.getData();

    // get User Object
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

    // //// get User Object
  }

  ngOnInit(){
    if(window.innerWidth > 850){this.sizeOk = true;}

    if(this.theme.getMode() == "dark"){
      this.modeStyle = "color:white;background-color:black;";
      const element = this.elementRef.nativeElement.querySelector("#DIV");
      if(element){
        element.style.backgroundColor = "black";
      }
      this.color = "white";
      this.backgroundColor = "rgb(29,36,40)";
    }
    else if(this.theme.getMode() == "white"){
      this.modeStyle = "color:black;background-color:white;";
      this.backgroundColor = "rgb(242,242,242)";
      this.color = "black";
    }

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

  async getData(){
    if(this.requestCount > 3){
      return;
    }
    const URL = "https://api.webolary.com/?AllUserOnlineStatus=&token="+this.cookieService.get('username');
    try {
      const response = await fetch(URL);
      const data = await response.json(); 
      this.request = data.data;

      const usernameToRemove = this.cookieService.get('username').split('|')[0];
      this.request = data.data.filter((item: { username: string; }) => item.username !== usernameToRemove);
    
    } catch (error) {
      console.error('Error could not connect ERROR: \"webolaryConnect API 404\" ', error);
    }

    this.requestCount ++;
  }

  protected sendScreenLock(username:string){
    this.websocket.sendMessage("lock screen:"+username);
  }
}
