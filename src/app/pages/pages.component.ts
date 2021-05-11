import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { ServicesSettingsService } from '../services/services-settings.service';

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



  constructor(private Services: ServicesSettingsService) { }

  ngOnInit(): void {
    CustomInitFunction();
  }


}
