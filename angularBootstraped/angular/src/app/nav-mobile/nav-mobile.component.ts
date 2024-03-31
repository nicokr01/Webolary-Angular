import { Component } from '@angular/core';
import { System } from '../WebolarySystem/system';

@Component({
  selector: 'app-nav-mobile',
  templateUrl: './nav-mobile.component.html',
  styleUrl: './nav-mobile.component.css'
})
export class NavMobileComponent {
  protected mobileMenuDiv = "display:none";

  constructor(protected system:System){}

  closeMenu(){
     this.mobileMenuDiv = "display:none";
  }

  openMenu(){
    this.mobileMenuDiv = "display:block";
  }

  redirect(url:string){
    this.system.redirect(url);
  }
}
