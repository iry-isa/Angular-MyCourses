import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { AdminGuard } from '../guards/admin.guard';
import {
  AccountSettingsComponent
} from './account-settings/account-settings.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { CursosComponent } from './mantenimientos/cursos/cursos.component';
import {
  ProfesorComponent
} from './mantenimientos/profesores/profesor.component';
import {
  ProfesoresComponent
} from './mantenimientos/profesores/profesores.component';
// Mantenimientos
import {
  UsuariosComponent
} from './mantenimientos/usuarios/usuarios.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProgressComponent } from './progress/progress.component';

const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
  { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuenta' }},
  { path: 'buscar/:termino', component: BusquedaComponent, data: { titulo: 'Busquedas' }},
  { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Gráfica #1' }},
  { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario' }},
  { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar' }},
 

  // Mantenimientos
  { path: 'cursos', component: CursosComponent, data: { titulo: 'Matenimiento de Cursos' }},
  { path: 'profesores', component: ProfesoresComponent, data: { titulo: 'Matenimiento de Profesores' }},
  { path: 'profesor/:id', component: ProfesorComponent, data: { titulo: 'Matenimiento de Profesores' }},

  // Rutas de Admin
  { path: 'usuarios', canActivate: [ AdminGuard ], component: UsuariosComponent, data: { titulo: 'Matenimiento de Usuarios' }},
]



@NgModule({
  imports: [ RouterModule.forChild(childRoutes) ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
