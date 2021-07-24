import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuarios.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuItems: any[] = [];
  public usuario!: Usuario;

  constructor(private sideServices: SidebarService, private UsuarioService: UsuarioService) {

    this.menuItems = this.sideServices.menu;
    this.usuario = UsuarioService.usuario;
  }

  ngOnInit(): void {
  }

}
