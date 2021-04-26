import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
@Component({
  selector: 'app-donat',
  templateUrl: './donat.component.html',
  styles: [
  ]
})
export class DonatComponent {


  @Input() title = 'Sin titulo';
  // tslint:disable-next-line: no-input-rename
  
  @Output() valorSalida: EventEmitter<string> = new EventEmitter();

  @Input('labels') doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input('data')  doughnutChartData: MultiDataSet = [
    [350, 450, 100]
    
  ];
  public doughnutChartType: ChartType = 'doughnut';


}
