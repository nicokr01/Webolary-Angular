import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { WebsocketService } from '../websocket.service';
import { Auth } from '../Auth/auth';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent extends Auth{
  constructor(cookieService: CookieService,websocket:WebsocketService) {
    super(cookieService,websocket);
  }

  ngOnInit() {
    if(this.cookieService.get("username")){
      location.href = "/home";
    }
  }
}
