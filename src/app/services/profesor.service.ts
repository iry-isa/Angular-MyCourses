import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Profesor } from '../models/profesor.model';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  constructor( private http: HttpClient ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }


  cargarProfesores() {

    const url = `${ base_url }/profesores`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, profesores: Profesor[] }) => resp.profesores )
              );
  }

  obtenerProfesorPorId( id: string ) {

    const url = `${ base_url }/profesores/${ id }`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, profesor: Profesor }) => resp.profesor )
              );
  }

  crearProfesor( profesor: { nombre: string, curso: string } ) {

    const url = `${ base_url }/profesores`;
    return this.http.post( url, profesor, this.headers );
  }

  actualizarProfesor( profesor: Profesor  ) {

    const url = `${ base_url }/profesores/${ profesor._id }`;
    return this.http.put( url, profesor, this.headers );
  }

  borrarProfesor( _id: string ) {

    const url = `${ base_url }/profesores/${ _id }`;
    return this.http.delete( url, this.headers );
  }

}
