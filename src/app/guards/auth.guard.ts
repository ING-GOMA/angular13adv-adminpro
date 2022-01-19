import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private _router: Router,  private _usuarioService: UsuarioService ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

     return this._usuarioService.validarToken().pipe(
       tap( estaAutenticado => { 

        if ( !estaAutenticado ) {
          this._router.navigateByUrl('/login');
        }
        } )
     );

  }
  
}
