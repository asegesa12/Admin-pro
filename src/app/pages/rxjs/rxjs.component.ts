import { Component, OnDestroy } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy  {

  public IntervalSubs!: Subscription;

  constructor() {
    this.IntervalSubs = this.retornarIinterval().subscribe
    (valor => {
      console.log( valor);  
    });

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.IntervalSubs.unsubscribe();
    
  }

  //   const ob$ = new Observable( Observer => {

  //     let i = -1;

  //     const intervalo = setInterval(() => {

  //       i++;
  //       Observer.next( i );
  //       if (i === 3) {
  //         clearInterval(intervalo);
  //         Observer.complete();
  //       }
  //       if( i === 2){
  //         Observer.error( i );
  //       }

  //     }, 1000);





  //   });

  //   ob$.subscribe(
  //     valor => console.log(`Valores: ${ valor}`),
  //     err => console.log(`Error: ${ err}`),
  //     () => console.log('Completado')
  //   );


  //  }

   // tslint:disable-next-line: ban-types
   retornarIinterval(): Observable<Number>{

    return interval(100)
    .pipe(
      map( valor => valor + 1),
      filter( pair => (pair % 2 === 0) ? true : false),
      //take(10)
    );

   }



}


