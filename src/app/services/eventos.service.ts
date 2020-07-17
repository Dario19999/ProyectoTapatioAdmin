import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { serialize } from 'object-to-formdata';
import { runInThisContext } from 'vm';

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

  eliminarImgs( id:number ){
    return this.http.get(`${this.url}eliminarImgs.php?id_imagen=${id}`).pipe(retry(3))
  }

  crearEvento( evento:any ){
    const EVENTO_FD = serialize(evento);
    return this.http.post(`${this.url}crearEvento.php`, EVENTO_FD).pipe(retry(3))
  }

  modificarInfoEvento( info:any ){
    const INFOEVENTO_FD = serialize(info);
    return this.http.post(`${this.url}modificarInfoEvento.php`, INFOEVENTO_FD).pipe(retry(3))
  }

  modificarHorarioEvento( horario:any ){
    const HORARIOEVENTO_FD = serialize(horario);
    return this.http.post(`${this.url}modificarHorarioEvento.php`, HORARIOEVENTO_FD).pipe(retry(3))
  }

  modificarImgsEvento( imgs:any ){
    const IMGSEVENTO_FD = serialize(imgs);
    return this.http.post(`${this.url}modificarImgsEvento.php`, IMGSEVENTO_FD).pipe(retry(3))
  }

  eliminarEvento( id:number ){
    return this.http.get(`${this.url}eliminarEvento.php?id=${id}`).pipe(retry(3))
  }

  buscarEvento( nombre:string ){
    return this.http.get(`${this.url}buscarEvento.php?nombre_evento=${nombre}`).pipe(retry(3))
  }
}
