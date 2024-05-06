import { Component } from '@angular/core';
import { Auth } from '../Auth/auth';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-communitycheck',
  templateUrl: './communitycheck.component.html',
  styleUrl: './communitycheck.component.css'
})
export class CommunitycheckComponent extends Auth{
    constructor(cookieService:CookieService){
      super(cookieService);
    }

    ngOnInit(){
      this.auth();
    }
}
