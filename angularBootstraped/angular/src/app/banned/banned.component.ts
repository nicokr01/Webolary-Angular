import { Component, ElementRef } from '@angular/core';
import { Theme } from '../Theme/theme';
import { CookieService } from 'ngx-cookie-service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-banned',
  templateUrl: './banned.component.html',
  styleUrl: './banned.component.css'
})
export class BannedComponent {
  protected displayMobile:boolean = false;
  protected superGlobalStyle = "";
  protected dataAPI:any;

  constructor(cookie:CookieService, protected elementRef:ElementRef,protected theme:Theme){}

    ngOnInit(){
      
      this.getData();

      /*Implement users theme*/
    if(this.theme.getMode() == "dark"){
      var darkDiv = this.elementRef.nativeElement.querySelector("#darkModeDiv");
      if(darkDiv){
        darkDiv.innerHTML = "<style>.theme{color:white} body{background-color:var(--darkmode)} #prg{background-color:rgba(0,0,0,0.65)} </style>";
      }
    }
    else{
      var darkDiv = this.elementRef.nativeElement.querySelector("#darkModeDiv");
      if(darkDiv){
        darkDiv.innerHTML = "<style>.theme{color:black}";
      }
    }

    /* //// Implement users theme*/

    /* set navList link*/
    localStorage.setItem("NavListItem","ActiveAX IPS");
    /* set navList link*/

    // Responsive
    if(window.innerWidth < 510){
      this.displayMobile = true;
    }
    // //// Responsive
    }

    // bluring page is menu is active

    // //// bluring page

    private async getData(){
      const url = 'https://api.webolary.com?clientInfo';
      await fetch(url)
        .then(response => response.json())
        .then(data => {
              this.dataAPI = data;

              const token = "2t7jky3VXBi0_RtXJrkZxpHSZRUV@@Be3CsWxIHyv3mysQ8vrvW_GeLVHWgFeGdt";
              const value =  JSON.stringify(data);
             
              const encrypted = this.encrypt("TEST123", token);
              alert(encrypted);
          })
        .catch(error => {
          console.error('Error could not connect ERROR: \"webolaryConnect API 404\" ', error);
        });
    }


    protected openMailClient() {
      // Ersetze die E-Mail-Adresse, Betreff und Nachricht durch deine eigenen
      const mailtoLink = 'mailto:support@webolary.com?subject=Issue blocked by ActiveAX&body=your message';
      // Öffne den Mailto-Link in einem neuen Tab
      window.open(mailtoLink, '_blank');
  }

  encrypt(text: string, secretKey: string): string {
    const key = CryptoJS.enc.Utf8.parse(secretKey);
    const iv = CryptoJS.lib.WordArray.random(16);
    const encrypted = CryptoJS.AES.encrypt(text, key, { iv: iv }).toString();
    return iv.toString(CryptoJS.enc.Hex) + ':' + encrypted;
  }
  
}
