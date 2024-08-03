import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Auth } from '../Auth/auth';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-add-check',
  templateUrl: './add-check.component.html',
  styleUrl: './add-check.component.css'
})
export class AddCheckComponent extends Auth{

  constructor(cookie:CookieService, private router:Router, websocket:WebsocketService){
    super(cookie,websocket);
  }

  ngOnInit(){
    this.auth();
  }
}
