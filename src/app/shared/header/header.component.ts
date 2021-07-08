import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {

  constructor(private usuarioService: UsuarioService) { }

  // tslint:disable-next-line: typedef
  logout(){
    this.usuarioService.logout();

  }


}
