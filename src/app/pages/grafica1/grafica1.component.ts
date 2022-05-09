import { ChartData } from 'chart.js';
import { Component } from '@angular/core';



@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  public labels1: string[] = ['pan', 'queso','tacos'];
  //public data1 = [[10, 30, 50]];
  public data2: ChartData <any> = { 
    labels: this.labels1, 
    datasets: [ 
      { data: [ 20, 50, 100 ] , 
      backgroundColor:['#8A7875','#43624D',"#5FA29C"] 
      }, 
    ] 
  };

}

