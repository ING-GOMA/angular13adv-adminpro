import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;
  public auth2:any;

  public loginForm = this._fb.group({
    email: [ localStorage.getItem('email') || '', [Validators.required, Validators.email ] ],
    password: [ '', Validators.required ],
    remenber: [ false ]
    
  });

  constructor( private _router : Router, private _fb: FormBuilder, private _usuarioService: UsuarioService, private _ngZone: NgZone ) { }
  
  ngOnInit(): void {

   this.renderButton(); 
  
  }

  login(){

    this._usuarioService.login( this.loginForm.value )
        .subscribe( resp => {

          if ( this.loginForm.get('remenber')?.value ) {
            localStorage.setItem('email', this.loginForm.get('email')?.value )
          }else{
            localStorage.removeItem('email');
          }
          //navegar al dashboard
          this._router.navigateByUrl('/');

        
        }, (err) => {
          // si sucede un error 
          Swal.fire('Error', err.error.msg, 'error');
        });
    
    //console.log(this.loginForm.value);
    //this._router.navigateByUrl('/');

  }

 renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });

    this.startApp();
  }

  async startApp() {

    await this._usuarioService.googleInit();
    this.auth2 = this._usuarioService.auth2;
    
    this.attachSignin(document.getElementById('my-signin2'));
        
  };

  attachSignin(element:any) {
    
    this.auth2.attachClickHandler(element, {},
        (googleUser:any) => {
          const id_token = googleUser.getAuthResponse().id_token;
          
          this._usuarioService.loginGoogle( id_token ).subscribe( resp => {
                  //navegar al dashboard
                  this._ngZone.run( () => {
  
                      this._router.navigateByUrl('/');
                  } )
          } );
                    

        }, (error:any) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

}
