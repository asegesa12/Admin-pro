import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { environment } from '../../environments/environment';



const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})


export class ModalImageService {

  // tslint:disable-next-line: variable-name
  private _hideModal = true;
  public tipo!: 'usuarios' | 'medicos' | 'hospitales';
  public img?: string;
  public id!: string;
  public _NewImage: EventEmitter<string> = new EventEmitter<string>();

  // tslint:disable-next-line: typedef
  get Hide(){
    return this._hideModal;
  }

  // tslint:disable-next-line: typedef
  Show(tipo: 'usuarios' | 'medicos' | 'hospitales', id: any, img: string = 'no-image'
   ){
    this._hideModal = false;
    this.tipo = tipo;
    this.id = id;

    if (img?.includes('https')){
      this.img = img;
    } else {
      this.img = `${BASE_URL}/upload/${tipo}/${img}`;
    }

    console.log(this.img);
  }

  CloseModal() {
    this._hideModal = true;
  }

  constructor() { }
}
