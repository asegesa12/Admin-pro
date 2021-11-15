import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { _MedicoUser, Medico, MedicoUser } from '../models/medicos.models';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  get token() {
    return localStorage.getItem('token') || '';
  }

  // tslint:disable-next-line: typedef
  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  loadMedics(desde: number = 0) {
    return this.http.get<_MedicoUser>
      (`${BASE_URL}/medicos?desde=${desde}`, this.headers)
      .pipe(

        // Esto transforma una arreglo de objetos a un arreglo  de usuarios.

        map( resp => {
          const medico = resp.Medico.map(
            medics => new Medico(medics.nombre, medics._id, medics.img
              , medics.usuario, medics.hospital)
          );

          return {
            total: resp.total,
            medico
          };

        })
      );

  }

  // tslint:disable-next-line: typedef
  GetMedicById(id: string){
    return this.http.get(`${BASE_URL}/medicos/${ id }`, this.headers)
    .pipe(
      map((resp: any) => resp.Medico

    ));
      /*.pipe(
        map(resp => {
          const medico = resp.Medico;

          return {
            medico
          };

        })
      );*/
  }

  AddMedic(medico: { nombre: string, hospital: string}){
    return this.http.post(`${BASE_URL}/medicos`, medico , this.headers);

  }

  DeleteMedic(medico: Medico) {
    return this.http.delete(`${BASE_URL}/medicos/${medico._id}`, this.headers);

  }

  Update(medico: Medico) {
    return this.http.put(`${BASE_URL}/medicos/${medico._id}`, medico, this.headers);

  }
}
