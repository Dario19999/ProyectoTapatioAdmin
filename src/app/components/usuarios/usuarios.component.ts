import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {

  usuarios = null;
  busqueda = null;

  encontrado:boolean = null;

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

  buscarUsuario(nombre:string){
    if(nombre == null || nombre == ""){
      return null
    }
    else{
      this.usuariosService.buscarUsuario(nombre).subscribe( resultado => {
        if(resultado == null){
          this.encontrado = false;
        }
        else{
          this.busqueda = resultado;
          this.encontrado = true;
        }

      });
    }
  }

  eliminarUsuario(id:number){
    if(confirm("Está seguro de querer eliminar a este usuario?")){
      this.usuariosService.eliminarUsuario(id).subscribe(datos => {
        if (datos['resultado']=='OK') {
          this.getUsuarios();
        }
      });
    }
  }
}
