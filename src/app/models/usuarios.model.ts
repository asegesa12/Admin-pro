import { environment } from 'src/environments/environment';

const BASE_URL = environment.base_url;

export class Usuario {

    constructor(

        public nombre: string,
        public email: string,
        public password?: string,
        public google?: boolean,
        public img?: string,
        public uid?: string,
        public role?: string,


    ){}


    get ImageUrl(): string{

            // Img from Google
        if ( this.img?.includes('https')){
            return this.img;
        }
            // Img Without google
        if (this.img) {
            return `${BASE_URL}/upload/usuarios/${this.img}`;
        } else {
            return `${BASE_URL}/upload/usuarios/no-image`;
        }
    }
}
