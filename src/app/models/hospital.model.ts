
interface _HospitalUser {
    _id: string;
    nombre: string;
    img?: string;

}

export class Hospital {

    constructor(

        public nombre:string,
        public _id?:string,
        public img?:string,
        public usuario?: _HospitalUser,
    ){}
    
}

//no acepta el tipado en el get hospital
// export interface HospitalInterface {

//     ok:boolean;
//     hospitales: Hospitales[];
//     uid:string;

// }

// export interface Hospitales {
//     _id: string;
//     nombre:string;
//     usuario:_HospitalUser;
// }