import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { PublicacionesComponent } from './components/publicaciones/publicaciones.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { RepartidoresComponent } from './components/repartidores/repartidores.component';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { EventoEditarComponent } from './components/evento-editar/evento-editar.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    EventosComponent,
    PublicacionesComponent,
    UsuariosComponent,
    RepartidoresComponent,
    EventoEditarComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
