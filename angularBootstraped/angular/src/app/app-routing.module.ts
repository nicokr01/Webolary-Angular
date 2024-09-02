import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BannedComponent } from './banned/banned.component';
import { AddVocabularyComponent } from './add-vocabulary/add-vocabulary.component';
import { AddCheckComponent } from './add-check/add-check.component';
import { TestComponent } from './test/test.component';
import { CommunitycheckComponent } from './communitycheck/communitycheck.component';
import { AiCheckComponent } from './ai-check/ai-check.component';
import { UsersettingsCheckComponent } from './usersettings-check/usersettings-check.component';
import { AdminPanelCheckComponent } from './admin-panel-check/admin-panel-check.component';
import { BreakComponent } from './break/break.component';
import { AIComponent } from './ai/ai.component';
import { SignupComponent } from './signup/signup.component';
import { LearnModeCheckComponent } from './learn-mode-check/learn-mode-check.component';
import { ContentNetworkComponent } from './content-network/content-network.component';
import { ContentNetowrkAuthComponent } from './content-netowrk-auth/content-netowrk-auth.component';
import { ContentNetworkCheckComponent } from './content-network-check/content-network-check.component';

const routes: Routes = [
    {path:"",component:HomeComponent},
    {path:"login",component:LoginComponent},
    {path:"home",component:HomeComponent},
    {path:"banned",component:BannedComponent},
    {path:"add",component:AddCheckComponent},
    {path:"addVocabulary",component:AddCheckComponent},
    {path:"test", component:TestComponent},
    {path:"community", component:CommunitycheckComponent},
    {path:"AI",component:AiCheckComponent},
    {path:"user", redirectTo: "user/settings", pathMatch: "full" },
    {path:"user/settings",component:UsersettingsCheckComponent},
    {path:"AdminPanel",component:AdminPanelCheckComponent},
    {path:"break",component:BreakComponent},
    {path:"Bierpause",component:BreakComponent},
    {path:"Signup",component:SignupComponent},
    {path:"learn",component:LearnModeCheckComponent},
    {path:"contentNetwork",component:ContentNetworkCheckComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
