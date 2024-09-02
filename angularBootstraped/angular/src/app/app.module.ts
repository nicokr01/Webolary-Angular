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
import { TestComponent } from './test/test.component';
import { CommunitycheckComponent } from './communitycheck/communitycheck.component';
import { CommunityComponent } from './community/community.component';
import { CardComponent } from './card/card.component';
import { AIComponent } from './ai/ai.component';
import { AiCheckComponent } from './ai-check/ai-check.component';
import { UsersettingsComponent } from './usersettings/usersettings.component';
import { UsersettingsCheckComponent } from './usersettings-check/usersettings-check.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminPanelCheckComponent } from './admin-panel-check/admin-panel-check.component';
import { BreakComponent } from './break/break.component';
import { SignupComponent } from './signup/signup.component';
import { LearnModeComponent } from './learn-mode/learn-mode.component';
import { LearnModeCheckComponent } from './learn-mode-check/learn-mode-check.component';
import { ContentNetworkCheckComponent } from './content-network-check/content-network-check.component';
import { ContentNetworkComponent } from './content-network/content-network.component';
import { ContentNetowrkAuthComponent } from './content-netowrk-auth/content-netowrk-auth.component';



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
    TestComponent,
    CommunitycheckComponent,
    CommunityComponent,
    CardComponent,
    AIComponent,
    AiCheckComponent,
    UsersettingsComponent,
    UsersettingsCheckComponent,
    AdminPanelComponent,
    AdminPanelCheckComponent,
    BreakComponent,
    SignupComponent,
    LearnModeComponent,
    LearnModeCheckComponent,
    ContentNetworkCheckComponent,
    ContentNetworkComponent,
    ContentNetowrkAuthComponent,
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
