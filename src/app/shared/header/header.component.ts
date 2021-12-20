import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuarios.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {

    public usuario!: Usuario;

  constructor(private usuarioService: UsuarioService, private route: Router) {
    this.usuario = usuarioService.usuario;
   }

  // tslint:disable-next-line: typedef
  logout(){
    this.usuarioService.logout();

  }

  buscar(termino:string){

    if(termino.length === 0){
      return;
    }

    this.route.navigateByUrl(`/dashboard/buscar/${ termino }`);
  }


}
