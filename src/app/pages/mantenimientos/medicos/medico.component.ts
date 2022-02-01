import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/medico.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  medicoForm!: FormGroup;
  hospitales: Hospital[] = [];
  hospitalSeleccionado?: Hospital;
  medicoSeleccionado!: Medico;

  constructor( private _activateRoute: ActivatedRoute,  private _router :Router, private _fb: FormBuilder, private _hospitalService:HospitalService, private _medicoService : MedicoService ) { }
//ActivatesRotuer para usar el url activavado para llenar los campos por id
  ngOnInit(): void {

    this._activateRoute.params.subscribe( ({ id }) => this.cargarMedico( id ) );

    this.medicoForm = this._fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required],
    })

    this.cargarHospitales();

    this.medicoForm.get('hospital')?.valueChanges.subscribe( hospitalId => {
       this.hospitalSeleccionado = this.hospitales.find( h => h._id === hospitalId )

    } )
  }

  cargarMedico( id: string ) {

    if ( id === 'nuevo' ) {
      return;
    }
    
     this._medicoService.obtenerMedicoPorId(id).pipe
     ( 
       delay(100)
     )
     .subscribe( medico => {
      
      if ( !medico ) {
        
        return  this._router.navigateByUrl(`/dashboard/medicos`);
      }   

      const { nombre, hospital: { _id}  }: any = medico;
      
      this.medicoSeleccionado = medico;

       return this.medicoForm.setValue( {nombre, hospital: _id} );
    });
  }

  cargarHospitales() {

    this._hospitalService.cargarHospitales().subscribe( (hospitales:Hospital[]) => {   
      this.hospitales = hospitales;
    } )
  }

  guardarMedico() {

    const { nombre } = this.medicoForm.value;


    if ( this.medicoSeleccionado ) {
      //actualziar

      const data = {
        ...this.medicoForm.value,
        _id : this.medicoSeleccionado._id
      }

      this._medicoService.actualizarMedico( data ).subscribe( resp => {
       
        Swal.fire( 'Actualizado', `${ nombre } actualizado correctamente`, 'success' );

      } )

    }else {
      //crear
 
      this._medicoService.crearMedico( this.medicoForm.value ).subscribe( (resp:any) => {
      
      Swal.fire( 'Creado', `${ nombre } creado correctamente`, 'success' );
      this._router.navigateByUrl(`/dashboard/medico/${ resp.medico._id }`)

      });

    }   

  }

}
