import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Curso } from '../../../models/curso.model';
import { BusquedasService } from '../../../services/busquedas.service';
import { CursoService } from '../../../services/curso.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styles: [
  ]
})
export class CursosComponent implements OnInit, OnDestroy {

  public cursos: Curso[] = [];
  public cargando: boolean = true;
  private imgSubs: Subscription;

  constructor( private cursoService: CursoService,
               private modalImagenService: ModalImagenService,
               private busquedasService: BusquedasService ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarCursos();

    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe( img => this.cargarCursos() );
  }

  buscar( termino: string ) {

    if ( termino.length === 0 ) {
      return this.cargarCursos();
    }

    this.busquedasService.buscar( 'cursos', termino )
        .subscribe( resp => {

          this.cursos = resp;

        });
  }

  cargarCursos() {

    this.cargando = true;
    this.cursoService.cargarCursos()
        .subscribe( cursos => {
          this.cargando = false;
          this.cursos = cursos;
        })

  }

  guardarCambios( curso: Curso ) {

    this.cursoService.actualizarCurso( curso._id, curso.nombre )
        .subscribe( resp => {
          Swal.fire( 'Actualizado', curso.nombre, 'success' );
        });

  }

  eliminarCurso( curso: Curso ) {

    this.cursoService.borrarCurso( curso._id )
        .subscribe( resp => {
          this.cargarCursos();
          Swal.fire( 'Borrado', curso.nombre, 'success' );
        });

  }

  async abrirSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear curso',
      text: 'Ingrese el nombre del nuevo curso',
      input: 'text',
      inputPlaceholder: 'Nombre del curso',
      showCancelButton: true,
    });

    if( value.trim().length > 0 ) {
      this.cursoService.crearCurso( value )
        .subscribe( (resp: any) => {
          this.cursos.push( resp.curso )
        })
    }
  }

  abrirModal(curso: Curso) {

    this.modalImagenService.abrirModal( 'cursos', curso._id, curso.img );

  }

}
 