import { filter, map, Subscription } from 'rxjs';
import { ActivationEnd, Router } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {
  
  public titulo: any;
  public tituloSubs$ : Subscription;
  
  constructor( private router: Router ) { 
    this.tituloSubs$ = this.getArgumentosRuta();

  }
  
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  getArgumentosRuta(){
    return this.router.events.subscribe(      
      event => {
        if(event instanceof ActivationEnd){
          if(event.snapshot.firstChild === null){
            map( (event: ActivationEnd) => event.snapshot.data)    
            this.titulo = event.snapshot.data;        
            console.log(this.titulo);
            document.title= `Admin Pro - ${this.titulo.titulo}`;
          }
        }
      }
    )
  }

}
