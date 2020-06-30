import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {

  // url = "http://proyectotapatio.com/PT-API-P/publicaciones/";
  url = "http://localhost:8080/PT-API/publicaciones/";

  constructor(private http:HttpClient) { }

  getPublicaciones(){
    return this.http.get(`${this.url}getPublicaciones.php`).pipe(retry(3))
  }

  getPublicacion( id_pub:number ){
    return this.http.get(`${this.url}getPublicacion.php?id_publicacion=${id_pub}`).pipe(retry(3))
  }

}
