import { UsuarioService } from 'src/app/services/usuario.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit{

  @ViewChild('googleBtn') googleBtn!: ElementRef;

  public formSubmitted = false;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [ Validators.required, Validators.email ]],
    password: ['', [ Validators.required ]],
    remember: [false]
  });

  constructor( private router: Router, 
                private fb: FormBuilder,
                private usuarioService: UsuarioService,
                private ngZone: NgZone) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit () {
    
    google.accounts.id.initialize({
      client_id:'295767579526-3n6h8u6gpe355ddtah4drknnssjl7ft3.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      //document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large", }  // customization attributes
    );
  }

  handleCredentialResponse(response: any){
    console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle( response.credential )
            .subscribe( resp => {
              //console.log({ login: resp })
              this.router.navigateByUrl('/');
            })
  }


  login (){
    this.usuarioService.login( this.loginForm.value)
            .subscribe( resp => {

              if ( this.loginForm.get('remember')?.value){
                localStorage.setItem('email', this.loginForm.get('email')?.value );
              }else{
                localStorage.removeItem('email');
              }

              //navegar al dashboard
              this.ngZone.run ( () => {
                
                this.router.navigateByUrl('/');
              })

            },  (err) => {
              // si sucede un error
              Swal.fire('Error', err.error.msg, 'error');
            });

    //console.log( this.loginForm.value );
    //this.router.navigateByUrl('/');
  }

}
