import { PagesRoutingModule } from './pages/pages.routing';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { NgModule, Component } from '@angular/core';
import {RouterModule, Routes} from '@angular/router'
import { AuthRoutingModule } from './auth/auth.routing';

const routes: Routes = [
  //--- debajo indico en donde estan las rutas---
  //path: '/dashboard' PagesRouting
  //path: '/auth' AuthRouting
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: '**', component: NopagefoundComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
