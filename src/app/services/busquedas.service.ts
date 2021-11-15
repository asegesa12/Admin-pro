import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuarios.model';
import { Hospital } from '../models/hospitals.model';



const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

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

  private TransformUsers(results: any[]): Usuario[] {

    return results.map(
      user => new Usuario(user.nombre, user.email, '', user.google, user.img, user.uid, user.role)
    );
  }


  // tslint:disable-next-line: typedef
  private TransformMedics(results: any[]) {

     return results;
  }

  // tslint:disable-next-line: typedef
  private TransformHospital(results: any[]): Hospital[] {

    return results;
  }

  // tslint:disable-next-line: typedef
  busqueda(tipos: 'usuarios' | 'medicos' | 'hospitales', termino: string) {
    return this.http.get<any[]>(`${BASE_URL}/todo/coleccion/${tipos}/${termino}`, this.headers)
      .pipe(
        map((resp: any) => {

          switch (tipos) {
            case 'usuarios':
              console.log(resp.resultados);
              return this.TransformUsers(resp.resultados);

            case 'hospitales':
              console.log(resp.resultados);
              return this.TransformHospital(resp.resultados);

            case 'medicos':
              console.log(resp.resultados);
              return this.TransformMedics(resp.resultados);

            default:
              return [];
          }
        })
      );
  }
}
