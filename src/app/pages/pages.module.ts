import { ComponentsModule } from './../components/components.module';
import { AppRoutingModule } from './../app-routing.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import {RouterModule} from '@angular/router'

import { FormsModule } from '@angular/forms'; 

import { PagesComponent } from './pages.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
  ],
  imports: [ 
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ComponentsModule,
    //AppRoutingModule   --> puede funcionar con el import que deje comentado, o con el import que esta solo
  ]
})
export class PagesModule { }
