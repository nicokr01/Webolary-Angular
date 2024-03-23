import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-banned',
  templateUrl: './banned.component.html',
  styleUrl: './banned.component.css'
})
export class BannedComponent {


  constructor(private cookieService:CookieService){}

  ngOnInit(){
    this.cookieService.delete("username");
  }
}
