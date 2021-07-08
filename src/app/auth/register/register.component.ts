import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css'
  ]
})
export class RegisterComponent   {

  public formSubmitted = false;

  constructor(private fb: FormBuilder, private usuarioServices: UsuarioService, private router: Router ) { }

  public registerForm = this.fb.group({
    nombre: ['Roman', [ Validators.required, Validators.minLength(3)] ],
    email: ['test100@gmail.com',  Validators.required ],
    password: ['12345', [ Validators.required, Validators.minLength(3)] ],
    password2: ['12345', [ Validators.required, Validators.minLength(3)] ],
    terminos: [ false ,  Validators.requiredTrue ]
  }, {
   Validators: this.PasswordEqual('password', 'password2')
  });

  createUser(){
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if(this.registerForm.invalid){
      return;
    }

    // Realizando La Creacion.
    this.usuarioServices.createUsers( this.registerForm.value )
        .subscribe(resp =>{
          console.log(resp);
          this.router.navigateByUrl('/');
        }, ( err ) => Swal.fire(
            'Error', err.error.msg, 'error'
        ));


  }

  campoNoValido( campo: string ): boolean{

    if(this.registerForm.get(campo)?.invalid && this.formSubmitted ){
      return true;
    } else {
      return false;
    }
  }

  ValidPass(): boolean{

    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if(pass1 !== pass2 && this.formSubmitted ){
      return true;
    } else {
      return false;
    }
  }

  PasswordEqual(pass1: string, pass2: string){

    return (formGroup : FormGroup) =>{
      const pass1Control = formGroup.get(pass1);
      const passContro2 = formGroup.get(pass2);

      if ( pass1Control?.value === passContro2?.value){
        passContro2?.setErrors(null);
      } else {
        passContro2?.setErrors({ NotEqual: true });
      }
    };

  }



}
