import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Auth } from '../Auth/auth';

@Component({
  selector: 'app-add-check',
  templateUrl: './add-check.component.html',
  styleUrl: './add-check.component.css'
})
export class AddCheckComponent extends Auth{

  constructor(cookie:CookieService, private router:Router){
    super(cookie);
  }

  ngOnInit(){
    this.auth();
  }
}
