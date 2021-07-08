import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';

import { catchError, map, tap } from 'rxjs/operators';

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

const BASE_URL = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {
    this.googleInit();
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

    const token = localStorage.getItem('token') || '';

    return this.http.get(`${BASE_URL}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (resp: any ) => {
        localStorage.setItem('token', resp.token);
      }),
      map( resp => true ),
      catchError( err => of(false))
    );

  }

}
