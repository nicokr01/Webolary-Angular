import { Component } from '@angular/core';
import { Auth } from '../Auth/auth';
import { CookieService } from 'ngx-cookie-service';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-ai-check',
  templateUrl: './ai-check.component.html',
  styleUrl: './ai-check.component.scss'
})
export class AiCheckComponent extends Auth{
  constructor(cookieService:CookieService,websocket:WebsocketService){
    super(cookieService,websocket);
  }

  ngOnInit(){
    this.auth();
  }
}
