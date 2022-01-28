import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay, Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  totalUsuarios: number = 0;
  usuarios : Usuario[] = [];
  usuariosTemp : Usuario[] = [];
  imgSubs!:Subscription;

  desde:number = 0;
  cargando: boolean = true;

  constructor( private _usuarioService:UsuarioService, private _busquedasService: BusquedasService, private _modalImagenService:ModalImagenService ) { }
  ngOnDestroy(): void {
     this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    
    this.cargarUsuarios();

    //actualza la imagen nueva del perfil del usario
    this.imgSubs = this._modalImagenService.nuevaImagen.pipe(delay(100))
                                                        .subscribe( img => this.cargarUsuarios());

  }

  cargarUsuarios(){
    // this._usuarioService.cargarUsuarios(0).subscribe( ({ total, usuarios }) => {
    //   console.log(resp);
    // })
    this.cargando = true;
    this._usuarioService.cargarUsuarios( this.desde ).subscribe( ({ total, usuarios }) => {
      this.totalUsuarios = total;
      this.usuarios = usuarios; 
      this.usuariosTemp = usuarios; 
      this.cargando = false;
    })
  }

  cambiarPagina( valor:number ){

    this.desde += valor;

    if ( this.desde < 0 ) {
      this.desde = 0;

    }else if ( this.desde >= this.totalUsuarios ) {
      this.desde -= valor;
    }

    this.cargarUsuarios();

  }

  buscar( termino: string ):any{
    
    if ( termino.length === 0 ) {
      return this.usuarios = this.usuariosTemp;
    }
    
    this._busquedasService.buscar('usuarios', termino).subscribe( resultados => {
      this.usuarios = resultados;
    } );

  }

  eliminarUsuario( usuario: Usuario ):any {

    if (usuario.uid === this._usuarioService.uid ) {
      return Swal.fire('Error', 'No se puede borrarse a si mismo', 'error')
    }

    Swal.fire({
      title: '¿Borrar Usuario?',
      text: `Esta a punto de borrar a ${ usuario.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, Borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._usuarioService.eliminarUsuario(usuario).subscribe( resp => {
          this.cargarUsuarios();
          Swal.fire(
            'Usuario Borrado',
            `${ usuario.nombre } fue eliminado correctamente`,
            'success' 
          );
        });
      }
    })

  }

  cambiarRole( usuario:Usuario ){

    this._usuarioService.guardarUsuario( usuario ).subscribe(resp =>{
      console.log(resp);
    })

  }

  abrirModal( usuario:Usuario ){
    console.log(usuario);
    this._modalImagenService.abrirModal('usuarios',usuario.uid,usuario.img);

  }


}
