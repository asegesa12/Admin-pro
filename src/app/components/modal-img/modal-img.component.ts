import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuarios.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-modal-img',
  templateUrl: './modal-img.component.html',
  styles: [
  ]
})

export class ModalImgComponent implements OnInit {

  public subirImagen!: File;
  public imgTemp!: any;
 

  constructor(public ModalService: ModalImageService, public UploadService: FileUploadService,
              public usuarioS: UsuarioService
    ) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  CloseModal(){
    this.imgTemp = null;
    this.ModalService.CloseModal();
  }

  changeImage(file: any): any {
    if (file.target.files[0]) {
      this.subirImagen = file.target.files[0];
      console.log(file);

      if (!file.target.files[0]) {
        return this.imgTemp = null;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file.target.files[0]);

      reader.onload = () => {
        this.imgTemp = reader.result;
        // console.log(reader.result);
      };
    }

  }

  UploadImage(){

    const id = this.ModalService.id;
    const tipo = this.ModalService.tipo;


    this.UploadService.updatePicture(this.subirImagen, tipo, id)
          .then( img => {
            Swal.fire(
              'Saved',
              'Image has been uploaded',
              'success'
            );
            this.ModalService._NewImage.emit(img);
            this.CloseModal();
          }, (err => {
            Swal.fire(
              'Error',
              err.error.msg,
              'error'
            );
          }));
  }


}
