import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent {

  @Input('valor') progress = 75;
  // tslint:disable-next-line: no-input-rename
  @Input() BtnClass = 'btn btn-primary';

  @Output() valorSalida : EventEmitter<number> = new EventEmitter();

  // tslint:disable-next-line: typedef
  changeValue(valor: number) {

    if (this.progress >= 100 && valor >= 0) {
      this.valorSalida.emit(100);
      return this.progress = 100;
    }

    if (this.progress <= 0 && valor < 0) {
      this.valorSalida.emit(0);
      return this.progress = 0;
    }
    
    this.valorSalida.emit(this.progress);
    return this.progress = this.progress + valor;
    

  }

  onChange( nuevoValor : number){

    if(nuevoValor >= 100){
      this.progress = 100;
    }   else if (nuevoValor <= 0){
        this.progress = 0;  

    } else {
      this.progress = nuevoValor;
    }

    this.valorSalida.emit( this.progress);
  }

}
