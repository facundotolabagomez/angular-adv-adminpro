import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.getUsuarios().then(usuarios => {
      console.log(usuarios);
    })
    /* const promesa = new Promise( (resolve, reject) => {
      if (false){
        resolve("Hola Mundooooo");
      }else{
        reject('Algo salio mal');
      }     
    });
    promesa.then( (mensaje) => {
      console.log(mensaje);
    })
    .catch( error => console.log('Error en la promesa', error));
    console.log("fin del init"); 
    ESTA PROMESA COMENTADA ES A MODO DE EJEMPLO, A CONTINUACION HAREMOS OTRA*/
    
  }
  getUsuarios(){
    const promesa = new Promise (resolve =>{
       fetch('https://reqres.in/api/users')
      .then( resp => resp.json() )
      .then(body => console.log(body.data));
    });
    return promesa;
  }
}
