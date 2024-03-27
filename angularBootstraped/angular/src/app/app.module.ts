import { NgModule } from '@angular/core';
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

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ToastModule,
    BrowserAnimationsModule,
    
  ],
  providers: [
    provideClientHydration(),
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
