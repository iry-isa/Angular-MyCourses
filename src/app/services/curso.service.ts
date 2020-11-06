import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Curso } from '../models/curso.model';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class CursoService {


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


  cargarCursos() {

    const url = `${ base_url }/cursos`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, cursos: Curso[] }) => resp.cursos )
              );
  }

  crearCurso( nombre: string ) {

    const url = `${ base_url }/cursos`;
    return this.http.post( url, { nombre }, this.headers );
  }
  actualizarCurso( _id: string, nombre: string  ) {

    const url = `${ base_url }/cursos/${ _id }`;
    return this.http.put( url, { nombre }, this.headers );
  }

  borrarCurso( _id: string ) {

    const url = `${ base_url }/cursos/${ _id }`;
    return this.http.delete( url, this.headers );
  }

}
