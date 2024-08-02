import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Auth } from '../Auth/auth';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-usersettings-check',
  templateUrl: './usersettings-check.component.html',
  styleUrl: './usersettings-check.component.css'
})

export class UsersettingsCheckComponent extends Auth{
  constructor(cookieService:CookieService,websocket:WebsocketService){
    super(cookieService,websocket);
  }

  ngOnInit(){
    this.auth();
  }
}
