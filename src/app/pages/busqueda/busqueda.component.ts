import { ActivatedRoute } from '@angular/router';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medicos.models';
import { Usuario } from 'src/app/models/usuarios.model';
import { Hospital } from 'src/app/models/hospitals.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html'
})
export class BusquedaComponent implements OnInit {

  public usuario: Usuario[] | any = [];
  public medico: Medico[] = [];
  public hospital: Hospital[] = [];

  constructor(private activatedroute: ActivatedRoute, private busquedaService: BusquedasService) { }

  ngOnInit(): void {
    this.activatedroute.params.subscribe(
      ({termino}) => 
        this.busqueda(termino));
  }

  busqueda(termino: string){
    this.busquedaService.busquedaGlobal(termino)
    .subscribe((resp: any) => {
      console.log(resp);
      this.usuario = resp.usuario;
      this.medico = resp.medicos;
      this.hospital = resp.hospital;
    });
      
  }

}
