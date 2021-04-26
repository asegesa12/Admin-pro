import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { DonatComponent } from './donat/donat.component';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [IncrementadorComponent, DonatComponent],

  exports: [
    IncrementadorComponent,
    DonatComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ]
})
export class ComponentsModule { }
