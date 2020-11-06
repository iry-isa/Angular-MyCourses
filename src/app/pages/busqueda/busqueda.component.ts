import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Curso } from 'src/app/models/curso.model';

import { Profesor } from '../../models/profesor.model';
import { Usuario } from '../../models/usuario.model';
import { BusquedasService } from '../../services/busquedas.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public profesores: Profesor[] = [];
  public cursos: Curso[] = [];


  constructor( private activatedRoute: ActivatedRoute,
               private busquedasService: BusquedasService) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .subscribe( ({ termino }) => this.busquedaGlobal( termino ));

  }

  // tslint:disable-next-line: typedef
  busquedaGlobal( termino: string ) {

    this.busquedasService.busquedaGlobal( termino )
        .subscribe( (resp: any) => {
          console.log(resp)
          this.usuarios   = resp.usuarios;
          this.profesores    = resp.profesores;
          this.cursos = resp.cursos;
        });

  }


  // tslint:disable-next-line: typedef
  abrirProfesor( profesor: Profesor ) {
  }

}
