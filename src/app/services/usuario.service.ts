import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';

import { catchError, map, tap } from 'rxjs/operators';

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuarios.model';
import { CargarUsuarios } from '../interfaces/cargar-usuarios.interface';

const BASE_URL = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario!: Usuario;



  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {
    this.googleInit();
   }

  // tslint:disable-next-line: typedef
  get token() {
    return localStorage.getItem('token') || '';
  }

  get uid(){
    return this.usuario.uid || '';
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    };
  }


  // tslint:disable-next-line: typedef
  googleInit() {

    return new Promise<void>( resolve => {

      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '820220487124-tqdjudcb7c449jpl1dpfs00u6prccc9l.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',

        });

        resolve();

      });



    });

  }


  // tslint:disable-next-line: typedef
  logout(){
    localStorage.removeItem('token');
    this.auth2.signOut().then( () => {
      this.ngZone.run( () => {
        this.router.navigateByUrl('/login');
       });
    });

  }

  // tslint:disable-next-line: typedef
  createUsers( formData: RegisterForm ){
    return this.http.post(`${BASE_URL }/usuarios`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }

  // tslint:disable-next-line: typedef
  updateProfile(data: {email: string, nombre: string, role: any}) {

    data = {
      ...data,
      role: this.usuario.role
    };

    return this.http.put(`${BASE_URL}/usuarios/${this.uid}`, data, {
      headers: {
        'x-token': this.token
      }
    });
  }

  // tslint:disable-next-line: typedef
  login( formData: LoginForm ){
    return this.http.post(`${BASE_URL}/login`, formData)
              .pipe(
                tap( (resp: any ) => {
                      localStorage.setItem('token', resp.token);
                })
              );
  }

  // tslint:disable-next-line: typedef
  loginGoogle(token: string) {
    return this.http.post(`${BASE_URL}/login/google`, { token })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }

  validarToken(): Observable<boolean>{

   // const token = localStorage.getItem('token') || '';

    return this.http.get(`${BASE_URL}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (resp: any ) => {

        const { email, google, nombre, role, img = '', uid  } = resp.usuario;

        this.usuario = new Usuario(nombre, email, '' , google , img, uid, role);
        localStorage.setItem('token', resp.token);
        return true;
      }),
         catchError( err => of(false))
    );

  }

  cargarUsuarios( desde: number = 0 ){

    return this.http.get<CargarUsuarios>(`${BASE_URL}/usuarios?desde=${ desde}`, this.headers )
        .pipe(

          // Esto transforma una arreglo de objetos a un arreglo  de usuarios.

          map( resp => {
            const usuarios = resp.usuarios.map(
              user => new Usuario(user.nombre, user.email, '', user.google, user.img, user.uid,
                user.role
              )
            );

            return {
              total: resp.total,
              usuarios
            };

          })
        );
  }

  RemoveUserService( usuario: Usuario){

    return this.http.delete(`${BASE_URL}/usuarios/${usuario.uid}`, this.headers);
  }

  changeUser(data: Usuario) {

    return this.http.put(`${BASE_URL}/usuarios/${data.uid}`, data, this.headers);
  }

}
