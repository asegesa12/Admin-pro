import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Hospital, _HospitalUser } from '../models/hospitals.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})


export class HospitalService {

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

  // tslint:disable-next-line: typedef
  createHospital(nombre: string){
    return this.http.post(`${BASE_URL}/hospitales`, { nombre } , this.headers);
  }

  // tslint:disable-next-line: typedef
  updateHospital(_id: string | undefined, nombre: string | undefined) {
    return this.http.put(`${BASE_URL}/hospitales/${_id}`, { nombre }, this.headers);
  }

  // tslint:disable-next-line: typedef
  DeleteHospital(hospital: Hospital) {
    return this.http.delete(`${BASE_URL}/hospitales/${hospital._id}`, this.headers);
  }

  // tslint:disable-next-line: typedef
  /*loadHospital(desde : number = 0): Observable<Hospital[]>{
    return this.http.get<{ ok: boolean, Hospital: Hospital[] }>
      (`${BASE_URL}/hospitales?desde=${ desde}`, this.headers)
              .pipe(
                map((resp: {ok: boolean, Hospital: Hospital[]}) => resp.Hospital)
              );

  }*/

  loadHospital(desde: number = 0){
    return this.http.get<_HospitalUser>
      (`${BASE_URL}/hospitales?desde=${ desde }`, this.headers)
      .pipe(

        // Esto transforma una arreglo de objetos a un arreglo  de usuarios.

        map(resp => {
          const hospital = resp.Hospital.map(
            hos => new Hospital( hos.nombre, hos._id, hos.img, hos.usuario
            )
          );

          return {
            total: resp.total,
            hospital
          };

        })
      );
     
  }
}
