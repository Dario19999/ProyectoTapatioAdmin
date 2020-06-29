import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  // url = "http://proyectotapatio.com/PT-API-P/eventos/";
  url = "http://localhost:8080/PT-API/eventos/";

  constructor(private http:HttpClient ) { }

  getEventos(){
    return this.http.get(`${this.url}getEventos.php`).pipe(retry(3));
  }
}
