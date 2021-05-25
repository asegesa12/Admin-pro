import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  public titulo! : string;
  public titleSub$! : Subscription;

  constructor( public router : Router) { }

  ngOnInit(): void {
   this.titleSub$ = this.ObtainTitles()
     .subscribe(
       ({ titulo }) => {
         this.titulo = titulo;
         document.title = `Admin Pro - ${titulo}`;
       }
     );
   
  }
 ngOnDestroy(): void {
   //Called once, before the instance is destroyed.
   //Add 'implements OnDestroy' to the class.
   this.titleSub$.unsubscribe();
 }


  ObtainTitles(){
    return this.router.events
      .pipe(
        filter((event): event is ActivationEnd => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data),
      );
  }

}
