import { Hospital } from './hospitals.model';
// tslint:disable-next-line: class-name
export interface _MedicoUser {
    _id: string;
    nombre: string;
    img: string;
    total: number;
    Medico: Medico[];
}

export interface MedicoUser {
   
    Medico: Medico;
}

export class Medico {


    constructor(
        public nombre?: string,
        // tslint:disable-next-line: variable-name
        public _id?: string,
        public img?: any,
        public usuario?: _MedicoUser,
        public hospital?: Hospital
    ) { }
}
