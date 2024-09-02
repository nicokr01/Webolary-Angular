import { Component } from '@angular/core';
import { Auth } from '../Auth/auth';
import { WebsocketService } from '../websocket.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-content-network-check',
  templateUrl: './content-network-check.component.html',
  styleUrl: './content-network-check.component.css'
})
export class ContentNetworkCheckComponent extends Auth{
  protected loginCDNAction:boolean = false;
  constructor(cookieService:CookieService,websocket:WebsocketService){
    super(cookieService,websocket);
  }

  ngOnInit(){
    this.checkAccess();
    
  }

  async checkAccess(){
    const url = 'https://api.webolary.com/?authCDN=&token='+this.cookieService.get('username');
    await fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if(data.status == "success"){
        this.dataLoaded = true;
      }
      else{
        this.loginCDNAction = true;
      }
    })
    .catch(error => {
      console.error('Error could not connect ERROR: \"webolaryConnect API 404\" ', error);
    });
  }

}
