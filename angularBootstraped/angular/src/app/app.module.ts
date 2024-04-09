import { ChangeDetectorRef, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BannedComponent } from './banned/banned.component';
import { NavTopComponent } from './nav-top/nav-top.component';
import { SidebarSmallLightComponent } from './sidebar-small-light/sidebar-small-light.component';

import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Theme } from './Theme/theme';
import { HttpClient } from '@angular/common/http';
import { NavMobileComponent } from './nav-mobile/nav-mobile.component';
import { System } from './WebolarySystem/system';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AddVocabularyComponent } from './add-vocabulary/add-vocabulary.component';
import { AddCheckComponent } from './add-check/add-check.component';



// Prime NG

// //// Prime


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    BannedComponent,
    NavTopComponent,
    SidebarSmallLightComponent,
    NavMobileComponent,
    AddVocabularyComponent,
    AddCheckComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
  ],
  providers: [
    provideClientHydration(),
    MessageService,
    Theme,
    CookieService,
    System,
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
