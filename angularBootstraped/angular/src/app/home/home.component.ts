import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(public c:CookieService){}

  ngOnInit(){
    if(this.c.check("username")){
      console.log("ok you can stay here")
    }
    else{
      console.log("no you need to login first ! ")
    }
  }
}
