import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor( private _http:HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get headers(){
    return {
     headers: {
       'x-token': this.token
     }
    }
  }

  private transformarUsuarios( resultados:any[] ): Usuario[] {

    return resultados.map(
      
      user => new Usuario( user.nombre, user.email, '', user.img, user.google,user.role,user.uid )
      
    );
 
  }
  private transformarHospital( resultados:any[] ): Hospital[] {

    return resultados;
 
  }
  private transformarMedico( resultados:any[] ): Medico[] {

    return resultados;
 
  }

  busquedaGlobal( termino: string ){
    
    const url = `${base_url}/todo/${termino}`;
  
    return this._http.get(url, this.headers );

  }

  buscar( tipo: 'usuarios'|'medicos'|'hospitales', termino: string ) {

    const url = `${base_url}/todo/coleccion/${tipo}/${ termino}`;
  
    return this._http.get<any[]>(url, this.headers ).pipe(
      map( (resp: any) => {
        switch (tipo) {
          case 'usuarios':
            return this.transformarUsuarios( resp.resultados )

            case 'hospitales':
            return this.transformarHospital( resp.resultados )

            case 'medicos':
            return this.transformarMedico( resp.resultados )
                      
        
          default:
            return [];
        }
      } )
    );
  }


}
