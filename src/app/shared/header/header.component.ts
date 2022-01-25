import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  usuario!: Usuario;

  constructor( private _usuarioService: UsuarioService ) { 
    this.usuario = _usuarioService.usuario;
  }

  logout(){
    this._usuarioService.logout();

  }

  

}
