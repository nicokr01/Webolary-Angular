import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Auth } from '../Auth/auth';
import { User } from '../User/User';
import CryptoJS from 'crypto-js';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-admin-panel-check',
  templateUrl: './admin-panel-check.component.html',
  styleUrl: './admin-panel-check.component.scss'
})
export class AdminPanelCheckComponent extends Auth {
  constructor(cookieService:CookieService,websocket:WebsocketService){
    super(cookieService,websocket);

    this.auth();

    var user:User;
    // get User Object
    const encryptedValue = sessionStorage.getItem("User");
    if (encryptedValue) {
        const token = "c(j:iGBE)2RKae3OfxaT[4WG7By9'+m{e?)mfc3ez7Td9/RiT@";
        const decryptedBytes = CryptoJS.AES.decrypt(encryptedValue, token);
        const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
        user = JSON.parse(decryptedData);
    } else {
        user = new User("","",-1,"","","","","",false,false,"",false);
        console.log("sessionStorage is empty :(");
    }

    if(user.access != 99 && user.access != 100){
        location.href = '/';
    }

    // //// get User Object
  }

}
