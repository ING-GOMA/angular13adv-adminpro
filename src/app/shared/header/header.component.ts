import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  usuario!: Usuario;

  constructor( private _usuarioService: UsuarioService, private _router: Router ) { 
    this.usuario = _usuarioService.usuario;
  }

  logout(){
    this._usuarioService.logout();

  }

  buscar( termino: string ){

    if (termino.length === 0) {
      this._router.navigateByUrl('/dashboard');
      //return;
    }

    this._router.navigateByUrl(`/dashboard/buscar/${ termino }`);

  }

  

}
