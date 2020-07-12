import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoletosService } from '../../services/boletos.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-boleto-editar',
  templateUrl: './boleto-editar.component.html'
})
export class BoletoEditarComponent implements OnInit {

  boleto:any = {};

  formPromoFechas:FormGroup;
  formPromoEvento:FormGroup;
  formPromoCodigo:FormGroup;

  mensajeError:string = null;

  promosCodigo:any = null;
  promosFechas:any = null;

  infoBoleto:any = {
    id:null,
    nombre:null,
    desc:null,
    inventario:null,
    precio:null
  }

  infoPromoFechas:any = {
    id_boleto:null,
    id_evento:null,
    fechaInicio:null,
    fechaFin:null,
    inventario:null,
    precio:null
  }

  infoPromoCodigo:any = {
    id: null,
    codigo:null,
    inventario:null,
    precio:null
  }
  formInfoBoleto:FormGroup;
  constructor(private activatedRoute:ActivatedRoute,
              private boletosService:BoletosService,
              private fb:FormBuilder) { }

  ngOnInit() {

    this.formInfoBoletoInit();
    this.formPromoFechasInit();
    this.formPromoCodigoInit();
    this.activatedRoute.params.subscribe( params => {
      this.boletosService.getBoleto(params['id']).subscribe( resultado => {

        this.boleto = resultado[0];

        this.infoPromoFechas.id_evento = this.boleto.fk_evento_bol

        this.formInfoBoleto.setValue({
          nombre:this.boleto.nom_bol,
          desc:this.boleto.descripcion_boleto,
          inventario:this.boleto.stock_boleto,
          precio:this.boleto.precio_bol
        });
      });

      this.boletosService.getPromosCodigo(params['id']).subscribe(resultado => this.promosCodigo = resultado)
      this.boletosService.getPromosFechas(params['id']).subscribe(resultado => this.promosFechas = resultado)
      this.infoPromoCodigo.id = params['id'];
      this.infoBoleto.id = params['id'];
      this.infoPromoFechas.id_boleto = params['id'];

    });
    console.log(this.infoPromoFechas);
    console.log(this.infoPromoCodigo);

  }

  formInfoBoletoInit(){
    this.formInfoBoleto = this.fb.group({
      nombre:['',],
      desc:['',],
      inventario:['',],
      precio:['',]
    })
  }

  formPromoCodigoInit(){
    this.formPromoCodigo = this.fb.group({
      codigo:['', [Validators.maxLength(10), Validators.minLength(10)]],
      inventarioCodigo:['',],
      precioCodigo:['',]
    })
  }

  formPromoFechasInit(){
    this.formPromoFechas = this.fb.group({
      fechaInicio:['',],
      fechaFin:['',],
      inventarioFechas:['',],
      precioFechas:['',]
    })
  }

  get codigoValidacion(){
    return this.formPromoCodigo.get('codigo').invalid
  }
  compararFechas(){
    let inicio = new Date(this.formPromoFechas.get('fechaInicio').value);
    inicio.setMinutes(inicio.getMinutes() + inicio.getTimezoneOffset())

    let cierre = new Date(this.formPromoFechas.get('fechaFin').value);
    cierre.setMinutes(cierre.getMinutes() + cierre.getTimezoneOffset())

    let hoy = new Date();
    hoy.setSeconds(0);
    hoy.setMinutes(0);
    hoy.setHours(0);

    if(inicio > cierre){
      this.mensajeError = "El evento no puede terminar antes de empezar."
      this.formPromoFechas.setErrors({'incorrect':true});
      return true
    }
    else if( hoy > inicio ){
      this.mensajeError = "El evento no puede empezar hoy o antes de hoy."
      this.formPromoFechas.setErrors({'incorrect':true});
      return true
    }
    else if( hoy > cierre ){
      this.mensajeError = "El evento no puede terminar hoy o antes de hoy."
      this.formPromoFechas.setErrors({'incorrect':true});
      return true
    }
    else{
      return false
    }
  }

  refresh(){
    this.activatedRoute.params.subscribe( params => {
      this.boletosService.getBoleto(params['id']).subscribe( resultado => this.boleto = resultado[0]);
    });
  }

  guardarInfo(){
    this.infoBoleto.nombre = this.formInfoBoleto.get('nombre').value;
    this.infoBoleto.desc = this.formInfoBoleto.get('desc').value;
    this.infoBoleto.inventario = this.formInfoBoleto.get('inventario').value;
    this.infoBoleto.precio = this.formInfoBoleto.get('precio').value;

    this.boletosService.modificarBoleto(this.infoBoleto).subscribe( datos => {
      if(datos['resultado'] == "ERROR"){
        console.log("ERROR");
        return
      }
      else if(datos['resultado'] == "OK"){
        this.refresh();
        window.confirm("Boleto modificado con éxito");
      }
    })
  }

  crearPromoFecha(){
    this.infoPromoFechas.fechaInicio = this.formPromoFechas.get('fechaInicio').value
    this.infoPromoFechas.fechaFin = this.formPromoFechas.get('fechaFin').value
    this.infoPromoFechas.inventario = this.formPromoFechas.get('inventarioFechas').value
    this.infoPromoFechas.precio = this.formPromoFechas.get('precioFechas').value

    this.boletosService.crearPromoFecha(this.infoPromoFechas).subscribe( datos => {
      if(datos['estado'] == -1){
        window.confirm(datos['mensaje']);
        return
      }
      else if(datos['estado'] == 0){
        window.confirm(datos['mensaje']);
        return
      }
      else{
        if(datos['resultado'] == "ERROR"){
          window.confirm("Ha habido un error.");
          return
        }
        else if(datos['resultado'] == "OK"){
          this.refresh();
          this.formPromoFechas.reset();
          window.confirm("Promoción creada con éxito.");
        }
      }
    })
  }

  crearPromoCodigo(){
    this.infoPromoCodigo.codigo = this.formPromoCodigo.get('codigo').value;
    this.infoPromoCodigo.inventario = this.formPromoCodigo.get('inventarioCodigo').value;
    this.infoPromoCodigo.precio = this.formPromoCodigo.get('precioCodigo').value;

    this.boletosService.crearPromoCodigo(this.infoPromoCodigo).subscribe( datos => {
      if(datos['resultado'] == "ERROR"){
        console.log("ERROR");
        return
      }
      else if(datos['resultado'] == "OK"){
        this.refresh();
        this.formPromoCodigo.reset()
        window.confirm("Promocion creada con éxito")
      }
    })
  }
}
