import { Component, ElementRef } from '@angular/core';
import { Theme } from '../Theme/theme';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { User } from '../User/User';
import CryptoJS from 'crypto-js';

@Component({
  selector: 'app-sidebar-small-light',
  templateUrl: './sidebar-small-light.component.html',
  styleUrl: './sidebar-small-light.component.css'
})
export class SidebarSmallLightComponent {
  protected modeSVG:SafeHtml = "";
  protected asideStyle = "";
  protected user:User; 
  protected reconstructedUserClass:User;

  constructor(protected theme:Theme,protected elementRef:ElementRef,private domsant:DomSanitizer){
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

      this.reconstructedUserClass = new User("","",-1,"","","","","",false,false,"",false);
      this.reconstructedUserClass.updateObject(this.user);
      this.reconstructedUserClass.points = this.user.points;

      // //// get User Object
  }

  ngOnInit(){
      this.renderColorThemeButton();

      if(this.theme.getMode() == "dark"){
          var aside = this.elementRef.nativeElement.querySelector("#aside");
          if(aside){
            aside.style.backgroundColor = "rgba(240,240,240,1)";
          }

          this.asideStyle = "background-image: linear-gradient(to bottom, #000000, #310620, #540048, #670083, #5120ce);z-index: 99;position: fixed;";
      }
      else{
        this.asideStyle = "background-image: linear-gradient(to bottom, rgb(242, 242, 242), #d3c9f8, #a893ee, #7f5ee0, #5120ce);z-index: 99;position: fixed;";
      }
  }

  switchMode(){
      this.theme.switchMode();
      this.renderColorThemeButton();
  }

  renderColorThemeButton(){
    if(this.theme.getMode() == "white"){
      this.modeSVG = this.domsant.bypassSecurityTrustHtml("<img src='../../../assets/image/whiteMode.svg' ><img style='display:none' src='../../../assets/image/darkMode.svg' >");
  }
    else if (this.theme.getMode() == "dark"){
      this.modeSVG = this.domsant.bypassSecurityTrustHtml("<img src='../../../assets/image/darkMode.svg' ><img style='display:none' src='../../../assets/image/whiteMode.svg' >");
    }
  }
}
