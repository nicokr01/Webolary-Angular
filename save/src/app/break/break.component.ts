import { Component } from '@angular/core';
import { User } from '../User/User';
import CryptoJS from 'crypto-js';

@Component({
  selector: 'app-break',
  templateUrl: './break.component.html',
  styleUrl: './break.component.scss'
})
export class BreakComponent {
  
  protected movingSpanText = "Search for a topic";
  protected superGlobalStyle = "";
  protected displayMobile = false;
  protected backgroundColor:string = "white";
  protected color:string = "white";
  protected sizeOk = false;
  protected user:User;


  constructor(){
    /* set navList link*/
    localStorage.setItem("NavListItem","Bierpause");
    /* set navList link*/

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
