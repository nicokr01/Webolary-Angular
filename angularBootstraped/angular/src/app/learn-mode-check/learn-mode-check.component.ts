import { Component } from '@angular/core';
import { Auth } from '../Auth/auth';
import { WebsocketService } from '../websocket.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-learn-mode-check',
  templateUrl: './learn-mode-check.component.html',
  styleUrl: './learn-mode-check.component.css'
})
export class LearnModeCheckComponent extends Auth{
  constructor(cookieService:CookieService,websocket:WebsocketService){
    super(cookieService,websocket);
  }

  ngOnInit(){
    this.auth();
  }
}
