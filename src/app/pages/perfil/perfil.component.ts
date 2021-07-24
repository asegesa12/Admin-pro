import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuarios.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public ProfileForm!: FormGroup;
  public usuario!: Usuario;
  public subirImagen!: File;
  public imgTemp!: any;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private fileUploadService: FileUploadService) {

    // Esto hace referencia al modelo del usuario
    // En el servicio.
    this.usuario = usuarioService.usuario;
   }

  ngOnInit(): void {
    this.ProfileForm = this.fb.group({
      nombre: [ this.usuario.nombre, Validators.required ],
      email: [this.usuario.email, [Validators.required, Validators.email ] ],
    });
  }

  // tslint:disable-next-line: typedef
  UpdateProfile(){

    this.usuarioService.updateProfile( this.ProfileForm.value)
        .subscribe( resp => {

          // Actualiza los cambios en tiempo real.
          const { email, nombre } = this.ProfileForm.value;
          this.usuario.nombre = nombre;
          this.usuario.email = email;
          console.log(resp);

          Swal.fire({
            icon: 'success',
            title: 'Updated Succesfully',
            showConfirmButton: true,

          });

            // Este error no hace nada
        }, (err) => Swal.fire(
          'Error', err.error.msg, 'error'
        ));


  }

  // tslint:disable-next-line: typedef
  changeImage( file: any): any {
    if ( file.target.files[0]){
      this.subirImagen = file.target.files[0];
      console.log(file);

      if (!file.target.files[0]){
        return this.imgTemp = null;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file.target.files[0] );

      reader.onload = () => {
        this.imgTemp = reader.result;
       // console.log(reader.result);
      };
    }

  }

  // tslint:disable-next-line: typedef
  uploadImage(){
    this.fileUploadService.updatePicture(this.subirImagen, 'usuarios', this.usuario.uid)
        .then( img => {
          this.usuario.img = img;

          Swal.fire({
            text: 'Avatar Updated',
            icon: 'success',
            showConfirmButton: true
          })
        }, (err) => Swal.fire(
          'Error', err.error.msg, 'error'
        ));
  }

}
