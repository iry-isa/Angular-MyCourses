import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Curso } from '../../../models/curso.model';
import { Profesor } from '../../../models/profesor.model';
import { CursoService } from '../../../services/curso.service';
import { ProfesorService } from '../../../services/profesor.service';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styles: [
  ]
})
export class ProfesorComponent implements OnInit {

  public profesorForm: FormGroup;
  public cursos: Curso[] = [];

  public profesorSeleccionado: Profesor;
  public cursoSeleccionado: Curso;



  constructor( private fb: FormBuilder,
               private cursoService: CursoService,
               private profesorService: ProfesorService,
               private router: Router,
               private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {

    this.activatedRoute.params
        .subscribe( ({ id }) => this.cargarProfesor( id ) );

    this.profesorForm = this.fb.group({
      nombre: ['', Validators.required ],
      curso: ['', Validators.required ],
    });

    this.cargarCursos();

    this.profesorForm.get('curso').valueChanges
        .subscribe( cursoId => {
          this.cursoSeleccionado = this.cursos.find( h => h._id === cursoId );
        });
  }

  // tslint:disable-next-line: typedef
  cargarProfesor(id: string) {

    if ( id === 'nuevo' ) {
      return;
    }

    this.profesorService.obtenerProfesorPorId( id )
      .pipe(
        delay(100)
      )
      .subscribe( profesor => {

        if ( !profesor ) {
          return this.router.navigateByUrl(`/dashboard/profesores`);
        }

        const { nombre, curso: { _id } } = profesor;
        this.profesorSeleccionado = profesor;
        this.profesorForm.setValue({ nombre, curso: _id });
      });

  }

  cargarCursos() {

    this.cursoService.cargarCursos()
      .subscribe( (cursos: Curso[]) => {
        this.cursos = cursos;
      });

  }

  guardarProfesor() {

    const { nombre } = this.profesorForm.value;

    if ( this.profesorSeleccionado ) {
      // actualizar
      const data = {
        ...this.profesorForm.value,
        _id: this.profesorSeleccionado._id
      };
      this.profesorService.actualizarProfesor( data )
        .subscribe( resp => {
          Swal.fire('Actualizado', `${ nombre } actualizado correctamente`, 'success');
        });

    } else {
      // crear

      this.profesorService.crearProfesor( this.profesorForm.value )
          .subscribe( (resp: any) => {
            Swal.fire('Creado', `${ nombre } creado correctamente`, 'success');
            this.router.navigateByUrl(`/dashboard/profesor/${ resp.profesor._id }`);
        });
    }



  }

}
