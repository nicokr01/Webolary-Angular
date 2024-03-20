import { Component} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import { NavTopComponent } from '../nav-top/nav-top.component';
import { SidebarSmallLightComponent } from '../sidebar-small-light/sidebar-small-light.component';
import { FormsModule } from '@angular/forms';

import { Auth } from '../Auth/auth';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,NavTopComponent,SidebarSmallLightComponent,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent extends Auth{
  protected input:string = "";
  protected inputActiveState:boolean = false;

  constructor(cookieService:CookieService){
    super(cookieService);
  }

  ngOnInit(){
    /*Aufareisen & block unauthorized actions => bann Page*/
    this.auth();
    /* Nimma aufareisen */ 

    /* Input span move animation check */
    setInterval(() => {
      this.checkMovingSpanPosition();
    },200);
    /* //// Input span move animation check */

  }


  onFocus(){
    this.inputActiveState = true;
  }

  onBlur(){
    this.inputActiveState = false;
  }

  inputAreaClicked(){
    let div = document.getElementById("movingSpan");
    if(div){
      div.classList.remove("moveBottom")
      div.classList.add("moveTop");
      div.style.marginTop = "-7rem";
      div.style.color ="black";
    }

    let input = document.getElementById("germanText");
    input?.focus();
  }

  checkMovingSpanPosition(){
    let div = document.getElementById("movingSpan");
    if(div){
      if(div.style.marginTop == "-7rem" && this.input.length < 1){
          if(!this.inputActiveState){
            div.classList.remove("moveTop");
            div.classList.add("moveBottom");
            div.style.marginTop = "-4rem";
            div.style.color ="rgb(156,163,175)";
          }
      }
    }
  }
}
