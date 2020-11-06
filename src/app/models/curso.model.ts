interface _CursoUser {
    _id: string;
    nombre: string;
    img: string;
}


export class Curso {

    constructor(
        public nombre: string,
        public _id?: string,
        public img?: string,
        public usuario?: _CursoUser,
    ) {}

}

