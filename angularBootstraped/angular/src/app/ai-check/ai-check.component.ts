import { Component } from '@angular/core';
import { Auth } from '../Auth/auth';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-ai-check',
  templateUrl: './ai-check.component.html',
  styleUrl: './ai-check.component.css'
})
export class AiCheckComponent extends Auth{
  constructor(cookieService:CookieService){
    super(cookieService);
  }

  ngOnInit(){
    this.auth();
  }
}
