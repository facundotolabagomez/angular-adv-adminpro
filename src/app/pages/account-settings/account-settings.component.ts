import { SettingsService } from './../../services/settings.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {
  //public linkTheme = document.querySelector('#theme');
  //public links = document.querySelectorAll('.selector');
  //public links: NodeListOf<Element>;
  constructor(private settingsService: SettingsService) { }
  ngOnInit(): void {
    //this.links = document.querySelectorAll('.selector');
    this.settingsService.checkCurrentTheme();
  }
  changeTheme ( theme: string){
    /* //console.log(theme);
    TODO ESTO SE FUE AL SETTING SERVICE TS
    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme?.setAttribute('href',url);
    localStorage.setItem('theme',url);
    */
    this.settingsService.changeTheme(theme);
  }
  /* checkCurrentTheme(){
    this.links.forEach(elem =>{
      elem.classList.remove('working');
      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme?.getAttribute('href');
      if(btnThemeUrl === currentTheme){
        elem.classList.add('working');
      }
    })
  } TODO ESTO MIGRÓ AL SETTING SERVICE TS */
}