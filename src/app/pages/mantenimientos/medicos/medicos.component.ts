import { Component, OnInit, OnDestroy } from '@angular/core';
import { Medico } from '../../../models/medico.model';
import { MedicoService } from '../../../services/medico.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { delay, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public medicos: Medico[] = [];
  public cargando:boolean = true;
  imgSubs!:Subscription;

  constructor( private _medicoService:MedicoService, private _busquedasService: BusquedasService, private _modalImagenService:ModalImagenService ) { }
  
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();

    //actualza la imagen nueva del perfil del usario
    this.imgSubs = this._modalImagenService.nuevaImagen.pipe(delay(100))
                                                        .subscribe( img => this.cargarMedicos());
  }

  abrirModal(medico: Medico){
    
    this._modalImagenService.abrirModal('medicos',medico._id,medico.img);

  }
  buscar(termino :string) {
    if ( termino.length === 0 ) {
      return this.cargarMedicos();
    }
    
    this._busquedasService.buscar('medicos', termino).subscribe( resultados => {
      this.medicos = resultados as Medico[];
    } );
  }

  cargarMedicos(){

    this.cargando = true;
    this._medicoService.cargarMedicos().subscribe( medicos => {
      this.cargando = false;
      this.medicos = medicos;
      
    } );

  }

  borrarMedico(medico: Medico){

    Swal.fire({
      title: '¿Borrar Medico?',
      text: `Esta a punto de borrar a ${ medico.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, Borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._medicoService.borrarMedico(medico._id).subscribe( resp => {
          this.cargarMedicos();
          Swal.fire(
            'Usuario Borrado',
            `${ medico.nombre } fue eliminado correctamente`,
            'success' 
          );
        });
      }
    })

  }

}
