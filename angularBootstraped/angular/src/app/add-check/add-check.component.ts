import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-add-check',
  templateUrl: './add-check.component.html',
  styleUrl: './add-check.component.css'
})
export class AddCheckComponent {
  protected locationOK:boolean = false;

  constructor(protected cookie:CookieService, private router:Router){}

  ngOnInit(){
    this.locationOK = this.cookie.check("username");

    if(!this.locationOK){
      location.href = "/login";
    }
  }
}
