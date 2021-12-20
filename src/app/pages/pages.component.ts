import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { ServicesSettingsService } from '../services/services-settings.service';
import { SidebarService } from '../services/sidebar.service';

// @ts-ignore
// tslint:disable-next-line: typedef
declare function CustomInitFunction();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {



  constructor(private Services: ServicesSettingsService, private SideBar: SidebarService) { }

  ngOnInit(): void {
    CustomInitFunction();
    this.SideBar.cargarMenu();
  }


}
