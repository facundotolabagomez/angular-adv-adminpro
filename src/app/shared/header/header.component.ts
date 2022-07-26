import { UsuarioService } from 'src/app/services/usuario.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent{

  constructor( private usuarioService: UsuarioService ) { }
  
  logout(){
    this.usuarioService.logout();
  }

}
