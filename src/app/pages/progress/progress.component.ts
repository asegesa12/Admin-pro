import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: [ './progress.component.css'
  ]
})
export class ProgressComponent  {

progress1 = 25;
progress2 = 35;

get porcentaje1(){
  return `${this.progress1}%`;
}

  get porcentaje2() {
    return `${this.progress2}%`;
  }

}
