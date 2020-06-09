import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { PublicacionesComponent } from './components/publicaciones/publicaciones.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { RepartidoresComponent } from './components/repartidores/repartidores.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    EventosComponent,
    PublicacionesComponent,
    UsuariosComponent,
    RepartidoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
