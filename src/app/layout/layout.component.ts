import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit {

  id:string = null;
  usuario:any = {};
  loggedIn:boolean = false;

  constructor(private usuariosService:UsuariosService,
              private loginService:LoginService,
              private router:Router) { }

  ngOnInit(): void {
    this.id = localStorage.getItem("id_admin");

    // this.loggedIn = this.loginService.getEstadoSesion();

    if(this.id == null || this.usuario == {}){
      this.cerrarSesion();
    }
    this.getAdmin();
  }

  getAdmin(){
    this.usuariosService.getAdmin(Number(this.id)).subscribe( resultado => {
        this.usuario = resultado[0];
    })
  }

  cerrarSesion(){
    localStorage.removeItem("id_admin");
    this.router.navigate(['login'])
  }
}
