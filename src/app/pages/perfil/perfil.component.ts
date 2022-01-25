import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  perfilForm!: FormGroup;
  usuario!: Usuario;
  imagenSubir!: File;
  imgTemp: any = null;

  constructor( private _fb: FormBuilder, private _usuarioService: UsuarioService, private _fileUploadService: FileUploadService ) { 
    
    this.usuario = _usuarioService.usuario;

  }

  ngOnInit(): void {
    this.perfilForm = this._fb.group({
      nombre:[ this.usuario.nombre, Validators.required],
      email:[ this.usuario.email , [Validators.required, Validators.email] ],

    });

  }

  actualizarPerfil(){
    //console.log( this.perfilForm.value );
    this._usuarioService.actualizarPerfil( this.perfilForm.value ).subscribe( () =>{
      const { nombre, email } = this.perfilForm.value;
      this.usuario.nombre = nombre;
      this.usuario.email = email;

      Swal.fire('Guardado','los cambios fueron guardados', 'success');
    }, (err)=>{

      Swal.fire('Error',err.error.msg , 'error');

    } );
  }

  cambiarImagen( file:any ): any {

    const arch = file.target.files[0]
    this.imagenSubir = arch;
    
   
      if (!arch) { 
           return this.imgTemp = null;
      }
  
       const reader = new FileReader();
       reader.readAsDataURL( arch );

       reader.onloadend = () => {
         this.imgTemp = reader.result;
       
       }
  
  }

  subirImagen(){

    this._fileUploadService.actualizarFoto( this.imagenSubir, 'usuarios', this.usuario.uid ).then(
      img => {
        this.usuario.img = img
      Swal.fire('Guardado','Imagen de Usuario ACtualizada', 'success');

      }).catch( err =>{
        console.log(err);
      Swal.fire('Error', 'No se pudo subir la imagen' , 'error');

      } )

  }

}
