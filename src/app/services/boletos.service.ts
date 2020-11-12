import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { serialize } from 'object-to-formdata';

@Injectable({
  providedIn: 'root'
})
export class BoletosService {

  url = "https://proyectotapatio.com/PT-API-P/boletos/";
  //url = "http://localhost/PHP---Eventos/PT-API-P/boletos/";

  constructor(private http:HttpClient) { }

  crearBoleto( boleto:any ){
    const BOLETO_FD = serialize(boleto);
    return this.http.post(`${this.url}crearBoleto.php`, BOLETO_FD).pipe(retry(3))
  }

  buscarNombre( nombre:string, id:number = null ){
    return this.http.get(`${this.url}consultaNombre.php?nombre=${nombre}&id=${id}`).pipe(retry(3))
  }

  crearPromoFecha( datos:any ){
    const PROMO_FECHA_FD = serialize(datos);
    return this.http.post(`${this.url}crearPromoFechas.php`, PROMO_FECHA_FD).pipe(retry(3))
  }

  crearPromoCodigo( datos:any ){
    const PROMO_CODIGO_FD = serialize(datos);
    return this.http.post(`${this.url}crearPromoCodigo.php`, PROMO_CODIGO_FD).pipe(retry(3))
  }

  buscarCodigo( codigo:string ){
    return this.http.get(`${this.url}consultaCodigo.php?codigo=${codigo}`).pipe(retry(3))
  }

  crearPromoReferencia( datos:any ){
    const PROMO_REFERENCIA_FD = serialize(datos);
    return this.http.post(`${this.url}crearPromoReferencia.php`, PROMO_REFERENCIA_FD).pipe(retry(3))
  }

  eliminarBoleto( id_boleto:number ){
    return this.http.get(`${this.url}eliminarBoleto.php?id_boleto=${id_boleto}`).pipe(retry(3))
  }
  activarBoleto( id_boleto:number ){
    return this.http.get(`${this.url}activarBoleto.php?id_boleto=${id_boleto}`).pipe(retry(3))
  }

  eliminarPromoCodigo( id_promo:number ){
    return this.http.get(`${this.url}eliminarPromoCodigo.php?id_promo=${id_promo}`)
  }

  eliminarPromoFechas( id_promo:number ){
    return this.http.get(`${this.url}eliminarPromoFechas.php?id_promo=${id_promo}`)
  }

  eliminarPromoReferencia( id_promo:number ){
    return this.http.get(`${this.url}eliminarPromoReferencia.php?id_promo=${id_promo}`)
  }

  modificarBoleto( info:number ){
    const INFO_BOLETO_FD = serialize(info);
    return this.http.post(`${this.url}modificarBoleto.php`, INFO_BOLETO_FD).pipe(retry(3))
  }

  getBoletos( id_evento:number ){
    return this.http.get(`${this.url}getBoletos.php?id_evento=${id_evento}`).pipe(retry(3))
  }

  getBoletosEvento( id_evento:number ){
    return this.http.get(`${this.url}getBoletosEvento.php?id_evento=${id_evento}`).pipe(retry(3))
  }

  getBoleto( id_boleto:number ){
    return this.http.get(`${this.url}getBoleto.php?id_boleto=${id_boleto}`).pipe(retry(3))
  }

  getPromosCodigo( id_boleto:number ){
    return this.http.get(`${this.url}getPromosCodigo.php?id_boleto=${id_boleto}`).pipe(retry(3))
  }

  getPromosFechas( id_boleto:number ){
    return this.http.get(`${this.url}getPromosFechas.php?id_boleto=${id_boleto}`).pipe(retry(3))
  }

  getPromosReferencia( id_boleto:number ){
    return this.http.get(`${this.url}getPromosReferencia.php?id_boleto=${id_boleto}`).pipe(retry(3))
  }

  getBoletosTodos(){
    return this.http.get(`${this.url}getBoletosTodos.php`).pipe(retry(3))
  }

  validarPromo(id_boleto:number, inventario:number, precio:number){
    return this.http.get(`${this.url}validarPromo.php?id=${id_boleto}&inventario=${inventario}&precio=${precio}`).pipe(retry(3))
  }

  consultaPromoReferencia( boleto:number, boletoRef:number ){
    return this.http.get(`${this.url}consultaPromoReferencia.php?boleto=${boleto}&boletoRef=${boletoRef}`).pipe(retry(3))
  }

}
