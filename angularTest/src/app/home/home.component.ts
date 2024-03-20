import { Component} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import { NavTopComponent } from '../nav-top/nav-top.component';
import { SidebarSmallLightComponent } from '../sidebar-small-light/sidebar-small-light.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,NavTopComponent,SidebarSmallLightComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent {
  public dataLoaded:boolean = false;
  public username:any;

  constructor(public cookieService:CookieService){}

  async auth(){
    if(!this.cookieService.check("username")){
        location.href = "/login";
    }
    else{
      const url = 'https://webolary.com/API/?checkCookie=&value='+this.cookieService.get("username");

      await fetch(url)
      .then(response => response.json())
      .then(data => {
          if(data.check){
            this.dataLoaded = true;
            this.username = this.cookieService.get("username").split("|")[0];
          }
          else{
            location.href = "/banned"; 
          }
      })
      .catch(error => {
        console.error('Error could not connect ERROR: \"webolaryConnect API 404\" ', error);
      });

      
    }
  }

  ngOnInit(){
    this.auth();
  }
}
