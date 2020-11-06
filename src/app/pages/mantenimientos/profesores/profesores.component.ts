import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Profesor } from '../../../models/profesor.model';
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { ProfesorService } from '../../../services/profesor.service';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styles: [
  ]
})
export class ProfesoresComponent implements OnInit, OnDestroy {

  public cargando: boolean = true;
  public profesores: Profesor[] = [];
  private imgSubs: Subscription;

  constructor( private profesorService: ProfesorService,
               private modalImagenService: ModalImagenService,
               private busquedasService: BusquedasService ) { }
  
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }

  ngOnInit(): void {
    this.cargarProfesores();

    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe( img => this.cargarProfesores() );
  }

  cargarProfesores() {
    this.cargando = true;
    this.profesorService.cargarProfesores()
      .subscribe( profesores => {
        this.cargando = false;
        this.profesores = profesores;
      });
  }

  buscar( termino: string ) {

    if ( termino.length === 0 ) {
      return this.cargarProfesores();
    }

    this.busquedasService.buscar( 'profesores', termino )
        .subscribe( resp => {
          this.profesores = resp;
        });
  }

  abrirModal(profesor: Profesor) {

    this.modalImagenService.abrirModal( 'profesores', profesor._id, profesor.img );

  }

  borrarProfesor( profesor: Profesor ) {

    Swal.fire({
      title: '¿Borrar profesor?',
      text: `Esta a punto de borrar a ${ profesor.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {
        this.profesorService.borrarProfesor( profesor._id )
          .subscribe( resp => {

            this.cargarProfesores();
            Swal.fire(
              'Profesor borrado',
              `${ profesor.nombre } fue eliminado correctamente`,
              'success'
            );

          });

      }
    })

  }

}
