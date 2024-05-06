import { Component } from '@angular/core';
import { System } from '../WebolarySystem/system';
import { User } from '../User/User';
import CryptoJS from 'crypto-js';

@Component({
  selector: 'app-nav-mobile',
  templateUrl: './nav-mobile.component.html',
  styleUrl: './nav-mobile.component.css'
})
export class NavMobileComponent {
  protected mobileMenuDiv = "display:none";
  protected user:User;
  protected rank:string;

  constructor(protected system:System){
    const encryptedValue = sessionStorage.getItem("User");
    if (encryptedValue) {
        const token = "c(j:iGBE)2RKae3OfxaT[4WG7By9'+m{e?)mfc3ez7Td9/RiT@";
        const decryptedBytes = CryptoJS.AES.decrypt(encryptedValue, token);
        const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
        this.user = JSON.parse(decryptedData);
        console.log(this.user);
    } else {
        this.user = new User("","",-2,"");
        console.log("sessionStorage is empty :(");
    }

    var reconstructedUserClass = new User("","",-2,"");
    reconstructedUserClass.updateObject(this.user);

    this.rank = reconstructedUserClass.convertAccessString();
  }

  closeMenu(){
     this.mobileMenuDiv = "display:none";
  }

  openMenu(){
    this.mobileMenuDiv = "display:block";
  }

  redirect(url:string){
    this.system.redirect(url);
  }
}
