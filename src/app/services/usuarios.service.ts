import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  // url = "http://proyectotapatio.com/PT-API-P/usuarios/";
  url = "http://localhost:8080/PT-API/usuarios/";

  constructor( private http:HttpClient ) { }

  getUsuarios(){
    return this.http.get(`${this.url}getUsuarios.php`).pipe(retry(3));
  }

  buscarUsuario(nombre:string){
    return this.http.get(`${this.url}buscarUsuario.php?nombre_usuario=${nombre}`).pipe(retry(3))
  }

  eliminarUsuario( id:number ){
    return this.http.get(`${this.url}eliminarUsuario.php?id=${id}`).pipe(retry(3))
  }
}
