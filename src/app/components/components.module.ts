import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { DonatComponent } from './donat/donat.component';
import { ChartsModule } from 'ng2-charts';
import { ModalImgComponent } from './modal-img/modal-img.component';


@NgModule({
  declarations: [IncrementadorComponent, DonatComponent, ModalImgComponent],

  exports: [
    IncrementadorComponent,
    DonatComponent,
    ModalImgComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ]
})
export class ComponentsModule { }
