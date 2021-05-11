import { Component, OnInit } from '@angular/core';
import { ServicesSettingsService } from 'src/app/services/services-settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {



  constructor(private Service: ServicesSettingsService) { }

  ngOnInit(): void {
    this.Service.Checks();
  }

  // tslint:disable-next-line: typedef
  changeTheme(theme: string){

    this.Service.changeTheme( theme );

  }


}
