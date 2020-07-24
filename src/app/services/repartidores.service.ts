import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { serialize } from 'object-to-formdata';

@Injectable({
  providedIn: 'root'
})
export class RepartidoresService {

  url = "http://proyectotapatio.com/PT-API-P/repartidores/";
  // url = "http://localhost:8080/PT-API/repartidores/";

  constructor(private http:HttpClient) { }

  crearRepartidor( repartidor:any ){
    const REPARTIDOR_FD = serialize(repartidor);
    return this.http.post(`${this.url}crearRepartidor.php`, REPARTIDOR_FD).pipe(retry(3))
  }

  getRepartidores(){
    return this.http.get(`${this.url}getRepartidores.php`).pipe(retry(3))
  }

  eliminarRepartidor( id:number ){
    return this.http.get(`${this.url}eliminarRepartidor.php?id=${id}`).pipe(retry(3))
  }

  buscarRepartidor(nombre:string){
    return this.http.get(`${this.url}buscarRepartidor.php?nombre_rep=${nombre}`).pipe(retry(3))
  }
}
