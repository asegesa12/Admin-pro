import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

// tslint:disable-next-line: typedef
 async updatePicture(
      archivo: File,
      tipo: 'usuarios' | 'medicos' |'hospitales',
      id?: string ){

     try {

       const url = `${BASE_URL}/upload/${tipo}/${id}`;

       const formdata = new FormData();
       formdata.append('imagen', archivo);

       const resp = await fetch(url, {
         method: 'PUT',
         headers: {
           'x-token': localStorage.getItem('token') || ''
         },
         body: formdata
       });

       console.log(resp);

       const data = await resp.json();
       if (data.ok) {
         return data.nombreArchivo;
       } else {
         console.log(data.msg);
         return false;
       }

     } catch (error) {
        console.log(error);
        return false;
     }



    /*return this.http.put(`${BASE_URL}/upload/${tipo}/${id}`, formdata, {
      headers: {
        'x-token': localStorage.getItem('token') || ''
      }
    });*/

}


}
