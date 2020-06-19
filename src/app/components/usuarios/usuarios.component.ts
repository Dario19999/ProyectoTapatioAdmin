import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {

  usuarios = null;

  usuario = {
    id_usuario: null,
    nombre: null,
    correo: null
  }

  constructor(private usuariosService:UsuariosService){ }

  ngOnInit() {
    this.getUsuarios();
  }

  getUsuarios(){
    this.usuariosService.getUsuarios().subscribe( resultado => this.usuarios = resultado );
  }

}
