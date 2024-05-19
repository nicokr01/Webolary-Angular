import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Auth } from '../Auth/auth';

@Component({
  selector: 'app-usersettings-check',
  templateUrl: './usersettings-check.component.html',
  styleUrl: './usersettings-check.component.css'
})

export class UsersettingsCheckComponent extends Auth{
  constructor(cookieService:CookieService){
    super(cookieService);
  }

  ngOnInit(){
    this.auth();
  }
}
