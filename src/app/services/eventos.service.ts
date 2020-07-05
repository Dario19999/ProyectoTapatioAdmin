import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { serialize } from 'object-to-formdata';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  // url = "http://proyectotapatio.com/PT-API-P/eventos/";
  url = "http://localhost:8080/PT-API/eventos/";

  eventos = null;

  constructor(private http:HttpClient ) { }

  getEventos(){
    return this.http.get(`${this.url}getEventos.php`).pipe(retry(3));
  }

  getEvento( id:number ){
    return this.http.get(`${this.url}getEvento.php?id_evento=${id}`).pipe(retry(3))
  }

  getImgs( id:number ){
    return this.http.get(`${this.url}getImagenes.php?id_evento=${id}`).pipe(retry(3))
  }

  crearEvento( evento:any ){
    const formdata_evento = serialize(evento);
    console.log(...formdata_evento);
    return this.http.post(`${this.url}crearEvento.php`, formdata_evento).pipe(retry(3))
  }


  // toFormData( evento:any ){
  //   const formData = new FormData();
  //   for (const key of Object.keys(evento)) {
  //     const value = evento[key];
  //     if (value != null) {
  //       formData.append(key, value);
  //     }
  //   }
  //   return formData;
  // }

  eliminarEvento( id:number ){
    return this.http.get(`${this.url}eliminarEvento.php?id=${id}`).pipe(retry(3))
  }
}
