import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular';

  constructor(public router:Router){}

  login(){
    this.router.navigate(["/login"]);
  }

  home(){
    this.router.navigate(["/home"]);
  }
}
