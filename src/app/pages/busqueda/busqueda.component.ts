import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusquedasService } from '../../services/busquedas.service';
import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];


  constructor( private _activatedRouted: ActivatedRoute, private _busquedaService:BusquedasService ) { }

  ngOnInit(): void {

    this._activatedRouted.params.subscribe( ({termino}) => this.busquedaGlobal(termino) );
  }

  busquedaGlobal( termino: string ){

    this._busquedaService.busquedaGlobal(termino).subscribe( (resp: any) =>{
      console.log(resp);
      this.usuarios = resp.usuarios;
      this.medicos = resp.medicos;
      this.hospitales = resp.hospitales;
    } );

  }
  abrirMedico( medico: Medico){

  }

}
