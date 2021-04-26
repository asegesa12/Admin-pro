import { Component } from '@angular/core';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {



   public data1: any = [
    [50, 75, 25],
 
  ];

  public data2: any = [
    [100, 200, 300],

  ];

  public data3: any = [
    [500, 250, 50],

  ];



  public labels1: string[] = ['Download ', 'In-Store ', 'Mail-Order '];
  public labels2: string[] = ['PS5 ', 'Xbox-Series ', 'PC '];
  public labels3: string[] = ['CoD WZ 2019 ', 'CoD Black ops Cold War ', 'CoD Mobile '];
 

}
