import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoginRoute: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check if the current URL is /login
        this.isLoginRoute = event.urlAfterRedirects.includes('/login') || event.urlAfterRedirects.includes('/Signup') || event.urlAfterRedirects.includes('/home') || event.urlAfterRedirects.includes('/addVocabulary') || event.urlAfterRedirects.includes('/banned') || event.urlAfterRedirects.includes('/add') || event.urlAfterRedirects.includes('/community') || event.urlAfterRedirects.includes('/AI') || event.urlAfterRedirects.includes('/user') || event.urlAfterRedirects.includes('/user/settings') || event.urlAfterRedirects.includes('AdminPanel') || event.urlAfterRedirects.includes('Bierpause') || event.urlAfterRedirects.includes('contentNetwork') ;
        document.documentElement.classList.toggle('login-active', this.isLoginRoute);
      }
    });
  }
}
