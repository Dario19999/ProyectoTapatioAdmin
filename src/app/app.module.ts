import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HttpClientModule } from '@angular/common/http';

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

import { UsuariosService } from './services/usuarios.service';
import { EventosService } from './services/eventos.service';

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
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    UsuariosService,
    EventosService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
