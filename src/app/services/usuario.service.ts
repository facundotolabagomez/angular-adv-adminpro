import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {tap, map, catchError} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from './../../environments/environment';

import { RegisterForm } from './../interfaces/register-form.interfaces';
import { LoginForm } from './../interfaces/login-form.interface';
import { Usuario } from '../models/usuario.model';


declare const google: any;

const base_url = environment.base_url;

declare const gapi:any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: any;
  public token: any;

  constructor( private http: HttpClient,
                private router: Router,
                private ngZone: NgZone) {
                  //this.googleInit();
                }

/*
  googleInit() {
    return new Promise((resolve) => {
      google.accounts.id.load('auth2', () => {
        this.auth2 = google.accounts.id.initialize({
          client_id:
            '295767579526-3n6h8u6gpe355ddtah4drknnssjl7ft3.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
      });
    });
  }
  logout(){
    localStorage.removeItem('token');
    google.accounts.id.revoke( 'correo', () => {
      this.auth2.signOut().then( () => {
        //this.auth2.disconnect();
        this.ngZone.run( () => {
          this.auth2.getAuthInstance().disconnect();
          this.router.navigateByUrl('/login');
        })
      });
  })
  }  
*/


  guardarStorage(id: string, token: string, usuario: Usuario){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  logout() {
    this.usuario = null;
    this.token='';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    
    this.router.navigateByUrl('/login');

  }

  validarToken(): Observable<boolean>{
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${ base_url }/login/renew`, {
      headers:{
        'x-token': token
      }
    }).pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token);
      }),
      map ( resp => true ),
      catchError( error => of(false))
    );
  }

  crearUsuario ( formData: RegisterForm ){
    
    return this.http.post(`${ base_url }/usuarios`, formData)
                .pipe(
                  tap( (resp: any) => {
                    localStorage.setItem('token', resp.token)
                  })
                );
  }

  login ( formData: LoginForm ){
    
    return this.http.post(`${ base_url }/login`, formData)
                .pipe(
                  tap( (resp: any) => {
                    this.guardarStorage(resp.id, resp.token, resp.usuario);
                    localStorage.setItem('token', resp.token)
                  })
                );
  }

  loginGoogle ( token: string){
    return this.http.post(` ${ base_url }/login/google`, { token })
              .pipe(
                tap( (resp: any) => {
                  //console.log(resp),
                  this.guardarStorage(resp.id, resp.token, resp.usuario);
                  localStorage.setItem('token', resp.token)
                })
              )
  }

}
