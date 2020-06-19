import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url = "http://localhost:8080/PT-API/usuarios/";

  constructor( private http:HttpClient ) { }

  getUsuarios(){
    return this.http.get(`${this.url}getUsuarios.php`).pipe(retry(3));
  }
}
