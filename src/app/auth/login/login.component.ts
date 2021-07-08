import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ '../login/login.component.css'
  ]
})
export class LoginComponent implements OnInit {

  public auth2: any;

  constructor(private router: Router, private fb: FormBuilder, private LoginService: UsuarioService, private ngZone: NgZone) { }

   public LoginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '' ,  [ Validators.required, Validators.email ] ],
    password: ['12345', [ Validators.required, Validators.minLength(3)] ],
    remember: [ localStorage.getItem('remember') ]
  });

  ngOnInit(): void {
    this.renderButton();
  }

  // test100@gmail.com

  // tslint:disable-next-line: typedef
  login(){
    this.LoginService.login( this.LoginForm.value ).subscribe
    ( resp => {
      console.log( resp );

      if ( this.LoginForm.get('remember')?.value){
          localStorage.setItem('email', this.LoginForm.get('email')?.value);
          localStorage.setItem('remember', this.LoginForm.get('remember')?.value);
      } else {
        localStorage.removeItem('email');
        localStorage.removeItem('remember');
      }

      // Navegar Al Dashboard
      this.router.navigateByUrl('/');




    }, (err) => Swal.fire(
      'Error', err.error.msg, 'error'
    ));
  }

  // tslint:disable-next-line: typedef
  renderButton() {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark'
    });

    this.startApp();
  }

  // tslint:disable-next-line: typedef
  async startApp() {

      await this.LoginService.googleInit();
      this.auth2 = this.LoginService.auth2;

      this.attachSignin(document.getElementById('my-signin2'));

  }

  // tslint:disable-next-line: typedef
  attachSignin(element: any) {
    console.log(element.id);
    this.auth2.attachClickHandler(element, {},
      (googleUser: any) => {
        const id_token = googleUser.getAuthResponse().id_token;
        this.LoginService.loginGoogle(id_token ).subscribe( (resp) => {

          this.ngZone.run( () => {
            this.router.navigateByUrl('/');

          });
        });

      }, (error: any) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

}
