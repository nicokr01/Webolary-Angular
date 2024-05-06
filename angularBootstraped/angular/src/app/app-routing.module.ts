import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BannedComponent } from './banned/banned.component';
import { AddVocabularyComponent } from './add-vocabulary/add-vocabulary.component';
import { AddCheckComponent } from './add-check/add-check.component';
import { TestComponent } from './test/test.component';
import { CommunitycheckComponent } from './communitycheck/communitycheck.component';

const routes: Routes = [
    {path:"",component:HomeComponent},
    {path:"login",component:LoginComponent},
    {path:"home",component:HomeComponent},
    {path:"banned",component:BannedComponent},
    {path:"add",component:AddCheckComponent},
    {path:"addVocabulary",component:AddCheckComponent},
    {path:"test", component:TestComponent},
    {path:"community", component:CommunitycheckComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
