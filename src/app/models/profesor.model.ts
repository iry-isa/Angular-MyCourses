import { Curso } from './curso.model';

interface _ProfesorUser {
    _id: string;
    nombre: string;
    img: string;
}


export class Profesor {

    constructor(
        public nombre: string,
        public _id?: string,
        public img?: string,
        public usuario?: _ProfesorUser,
        public curso?: Curso
    ) {}

}

