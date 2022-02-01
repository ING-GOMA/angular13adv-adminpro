import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';

declare function customInitFunctions():void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
})
export class PagesComponent implements OnInit {

  

  constructor( private _settingsService : SettingsService, private _sidebarService :SidebarService ) { }

  ngOnInit(): void { 
    customInitFunctions();    
//crear el menu desde el bakend
    this._sidebarService.cargarMenu();
  }

}
