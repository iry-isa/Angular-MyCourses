import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Curso } from '../models/curso.model';
import { Profesor } from '../models/profesor.model';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

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

  private transformarUsuarios( resultados: any[] ): Usuario[] {

    return resultados.map(
      user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid )  
    );
  }

  private transformarCursos( resultados: any[] ): Curso[] {
    return resultados;
  }

  private transformarProfesores( resultados: any[] ): Profesor[] {
    return resultados;
  }

  busquedaGlobal( termino: string ) {

    const url = `${ base_url }/todo/${ termino }`;
    return this.http.get( url, this.headers );

  }


  buscar( 
      tipo: 'usuarios'|'profesores'|'cursos',
      termino: string
    ) {

    const url = `${ base_url }/todo/coleccion/${ tipo }/${ termino }`;
    return this.http.get<any[]>( url, this.headers )
            .pipe(
              map( (resp: any ) => { 

                switch ( tipo ) {
                  case 'usuarios':
                    return this.transformarUsuarios( resp.resultados )

                  case 'cursos':
                    return this.transformarCursos( resp.resultados )

                  case 'profesores':
                     return this.transformarProfesores( resp.resultados )
                
                  default:
                    return [];
                }

              })
            );

  }


}
