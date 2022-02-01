import { Component, OnInit, OnDestroy } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay, Subscription } from 'rxjs';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  hospitales: Hospital[] = [];
  cargando:boolean = true;
  imgSubs!:Subscription;

  constructor( private _hospitalService:HospitalService, private _modalImagenService: ModalImagenService, private _busquedasService:BusquedasService ) { }
  
  ngOnDestroy(): void {
   this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {

    this.cargarHospitales();

    //actualza la imagen nueva del perfil del usario
    this.imgSubs = this._modalImagenService.nuevaImagen.pipe(delay(100))
                                                        .subscribe( img => this.cargarHospitales());

  }
  
  buscar( termino: string ) {
    
    if ( termino.length === 0 ) {
      return this.cargarHospitales();
    }
    
    this._busquedasService.buscar('hospitales', termino).subscribe( resultados => {
      this.hospitales = resultados;
    } );

  }

  cargarHospitales(){
    
    this.cargando = true;
    this._hospitalService.cargarHospitales().subscribe( hospitales =>{
      //console.log(hospitales);
       this.cargando = false;
       this.hospitales = hospitales;
    } )
  }
  

  guardarCambios( hospital: Hospital ){
    
    this._hospitalService.actualizarHospital( hospital._id, hospital.nombre ).subscribe(resp =>{
      Swal.fire( 'Actualizado', hospital.nombre, 'success' );
    });

  }
  eliminarHospital( hospital: Hospital ){
    
    this._hospitalService.borrarHospital( hospital._id ).subscribe(resp =>{
      this.cargarHospitales();
      Swal.fire( 'Borrado', hospital.nombre, 'success' );
    });

  }

  async abrirSweetAlert(){
    
    const { value = '' } = await Swal.fire<string>({
      title:'Crear Hospital',
      text:'Ingrese el nuevo nombre del Hospital',
      input: 'text',
      inputLabel: 'Nombre',
      inputPlaceholder: 'Nombre del Hospital',
      showCancelButton: true
    })

    if ( value?.trim().length  > 0) {
      this._hospitalService.crearHospital( value ).subscribe( (resp:any) => {
        this.hospitales.push(resp.hospital );
      } )
    }
  }

  abrirModal(hospital: Hospital){
    
    this._modalImagenService.abrirModal('hospitales',hospital._id,hospital.img);

  }


}
