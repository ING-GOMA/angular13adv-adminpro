import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { tap,map, catchError } from 'rxjs/operators';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

const base_url = environment.base_url;
declare const gapi:any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2:any;

  constructor(private _ngZone: NgZone ,private _http:HttpClient, private _router: Router) {
    this.googleInit();
   }

  googleInit(){
    
    return new Promise<void>( resolve =>{

      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '244447371591-esusbdhcvrudi2q5ch6p7uvktqsf0ki2.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
     
      });

     } )

        
  }

  logout(){
    localStorage.removeItem('token');

    this.auth2.signOut().then( ()=> {

      this._ngZone.run( ()=>{

        this._router.navigateByUrl('/login');

      } )

      
    });

  }

  validarToken():Observable<boolean> {
    
    const token = localStorage.getItem('token') || '';
     return this._http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (resp:any) => {
        localStorage.setItem('token', resp.token );
      } ),
      map( resp => true ),
      catchError( error => of(false)  )
    );

  }

  crearUsuario( formData: RegisterForm ){
    
   return this._http.post(`${ base_url }/usuarios`, formData).pipe(
    tap( ( resp: any) =>{
        localStorage.setItem('token', resp.token);
      })
    )

  }

  login( formData: LoginForm ){
    
    return this._http.post(`${ base_url }/login`, formData)
    .pipe(
      tap( ( resp: any) =>{
        localStorage.setItem('token', resp.token);
      } )
    ) 
   }
   
   loginGoogle( token:any ){
    
    return this._http.post(`${ base_url }/login/google`, { token })
    .pipe(
      tap( ( resp: any) =>{
        localStorage.setItem('token', resp.token);
      } )
    )
 
   }
}
