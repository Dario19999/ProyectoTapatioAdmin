import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { PublicacionesComponent } from './components/publicaciones/publicaciones.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { RepartidoresComponent } from './components/repartidores/repartidores.component';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { EventoEditarComponent } from './components/evento-editar/evento-editar.component';
import { PublicacionEditarComponent } from './components/publicacion-editar/publicacion-editar.component';
import { PerfilComponent } from './components/perfil/perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    EventosComponent,
    PublicacionesComponent,
    UsuariosComponent,
    RepartidoresComponent,
    EventoEditarComponent,
    PublicacionEditarComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CarouselModule,
    AppRoutingModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
