import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { PublicacionesComponent } from './components/publicaciones/publicaciones.component';
import { RepartidoresComponent } from './components/repartidores/repartidores.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { EventoEditarComponent } from './components/evento-editar/evento-editar.component';
import { PublicacionEditarComponent } from './components/publicacion-editar/publicacion-editar.component';
import { PerfilComponent } from './components/perfil/perfil.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'eventos', component: EventosComponent },
  { path: 'publicaciones', component: PublicacionesComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'repartidores', component: RepartidoresComponent },
  { path: 'editar-evento', component: EventoEditarComponent },
  { path: 'editar-publicacion', component: PublicacionEditarComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
