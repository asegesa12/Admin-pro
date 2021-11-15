// tslint:disable-next-line: class-name
export interface _HospitalUser {
    id: string;
    nombre: string;
    img: string;
    Hospital: Hospital[];
    total: number;
}

export class Hospital{
    constructor(
        public nombre?: string,
        // tslint:disable-next-line: variable-name
        public _id?: string,
        public img?: any,
        public usuario?: _HospitalUser
    ){}
}

