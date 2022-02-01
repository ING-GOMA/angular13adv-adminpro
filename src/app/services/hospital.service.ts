import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Hospital } from '../models/hospital.model';
import { Observable } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root' 
})
export class HospitalService {
  

  constructor( private _http:HttpClient ) { }
  
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
  

  cargarHospitales() {
    const url = `${base_url}/hospitales`;
    return this._http.get<any>(url, this.headers).pipe(
      map( (resp: { ok: boolean, hospitales: Hospital[]}) => resp.hospitales )
    )     
   }

   crearHospital( nombre: string ) {
    const url = `${base_url}/hospitales`;
    return this._http.post(url,{ nombre }, this.headers);
   }

   actualizarHospital( _id?: string, nombre?: string ) {
    const url = `${base_url}/hospitales/${_id}`;
    return this._http.put(url,{ nombre }, this.headers);
   }

   borrarHospital( _id?: string ) {
    const url = `${base_url}/hospitales/${_id}`;
    return this._http.delete(url, this.headers);
   }


  // cargarHospitales() {
  //   const url = `${base_url}/hospitales`;
  //   return this._http.get<HospitalInterface>(url,this.headers ).pipe(
  //     map( (resp:HospitalInterface) => resp.hospitales )
  //   );

  // }

  // cargarHospitales(): Observable<Hospital[]> {
     
  //   // const url = `${base_url}/hospitales`;
  //   // return this._http.get<{ ok: boolean, hospitales: Hospital[] }>(url,  this.headers  )
  //   // .pipe(
  //   //   map( (resp: { ok: boolean, hospitales: Hospital[] } ) => resp.hospitales )
  
  //   // );
  //   return this._http.get(url, this.headers).pipe(
  //     map<any,Hospital[]>( (resp:any ) => resp.hospitales )
  //   );

  //  }

}
