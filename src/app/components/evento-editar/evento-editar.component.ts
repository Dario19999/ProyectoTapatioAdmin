import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ActivatedRoute, Router } from '@angular/router';
import { EventosService } from '../../services/eventos.service';
import { BoletosService } from '../../services/boletos.service';

@Component({
  selector: 'app-evento-editar',
  templateUrl: './evento-editar.component.html'
})
export class EventoEditarComponent implements OnInit {

  formInfoE:FormGroup;
  formFechas:FormGroup;
  formImgE:FormGroup;
  formBoletos:FormGroup;


  urls = [];
  urlPrincipal = null;
  urlCarousel = null;

  evento:any = {};

  imgSeleccionada:File = null;
  imgCarouselSeleccionada:File = null;
  imgsSeleccionadas:File[] = [];
  listaImg:any[] = [];

  errorNombre:string = "";


  imgs:any = null;
  boletos:any = null;
  mensajeError = null;
  errorOrden:string = null;
  noBoletos:boolean = null;

  infoEvento:any = {
    id:null,
    nombre:null,
    tipo:null,
    desc:null,
    orden:null,
    enlace:null
  };

  fechasEvento:any = {
    id:null,
    diaInicio: null,
    diaFin: null,
    horaInicio: null,
    horaFin: null
  };

  imgsEvento:any = {
    id:null,
    imgPrincipal:null,
    imgCarousel:null,
    imgs:null
  };

  boletoEvento:any = {
    id:null,
    nombre:null,
    desc:null,
    inventario:null,
    precio:null
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['Anterior', 'Siguietne'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: true
  }

  @ViewChild('imgInputP',{ static: false }) imgInputP:ElementRef;
  @ViewChild('imgInputC',{ static: false }) imgInputC:ElementRef;
  @ViewChild('imgsInput',{ static: false }) imgsInput:ElementRef;
  @ViewChild('modalError',{static: false}) modalError;
  @ViewChild('cerrarModalError',{static: false}) cerrarModalError;

  constructor(private fb:FormBuilder,
              private activatedRoute:ActivatedRoute,
              private eventosService:EventosService,
              private boletosService:BoletosService,
              private router:Router) {}

  ngOnInit() {
    this.formInfoInit();
    this.formFechasInit();
    this.formImgInit();
    this.formBoletosInit();
    this.activatedRoute.params.subscribe( params => {
      this.eventosService.getEvento(params['id']).subscribe( resultado => {
        this.evento = resultado[0];

        this.formInfoE.setValue({
          nombre: this.evento.nombre_evento,
          tipo: this.evento.tipo_evento,
          desc: this.evento.descripcion_evento,
          orden: this.evento.orden_anuncio,
          enlace: this.evento.enlace_evento
        });

        this.formFechas.setValue({
          diaInicio: this.evento.dia_inicio_evento,
          diaFin: this.evento.dia_conclusion_evento,
          horaInicio: this.evento.hora_inicio_evento,
          horaFin: this.evento.hora_conclusion_evento
        });

      });
      this.eventosService.getImgs(params['id']).subscribe(resultado => this.imgs = resultado);
      this.boletosService.getBoletos(params['id']).subscribe( resultado => {
        if(resultado == null){
          this.noBoletos = true;
        }else{
          this.noBoletos = false;
          this.boletos = resultado;
        }
      });
      this.infoEvento.id = params['id'];
      this.fechasEvento.id = params['id'];
      this.imgsEvento.id = params['id'];
      this.boletoEvento.id = params['id'];
    });
  }

  formInfoInit(){
    this.formInfoE = this.fb.group({
      nombre:['',],
      tipo:['',],
      desc:['',],
      orden:['',],
      enlace:['',]
    })
  }

  formFechasInit(){
    this.formFechas = this.fb.group({
      diaInicio:['',],
      diaFin:['',],
      horaInicio:['',],
      horaFin:['',],
    })
  }

  formImgInit(){
    this.formImgE = this.fb.group({
      imgPrincipal:['', RxwebValidators.image({minHeight:690, maxHeight:2160, minWidth:950, maxWidth:4096})],
      imgCarousel:['', RxwebValidators.image({minWidth:1250, maxWidth:4096, minHeight:690, maxHeight:2160})],
      imgsEvento: ['', RxwebValidators.image({minHeight:690, maxHeight:2160, minWidth:950, maxWidth:4096})]
    })
  }

  formBoletosInit(){
    this.formBoletos = this.fb.group({
      nombre:['', Validators.required],
      desc:['', Validators.required],
      inventario:['', Validators.required],
      precio:['', Validators.required]
    })
  }

  compararFechas(){
    let inicio = new Date(this.formFechas.get('diaInicio').value);
    inicio.setMinutes(inicio.getMinutes() + inicio.getTimezoneOffset())

    let cierre = new Date(this.formFechas.get('diaFin').value);
    cierre.setMinutes(cierre.getMinutes() + cierre.getTimezoneOffset())

    let hoy = new Date();
    hoy.setSeconds(0);
    hoy.setMinutes(0);
    hoy.setHours(0);

    if(inicio > cierre){
      this.mensajeError = "El evento no puede terminar antes de empezar."
      this.formFechas.setErrors({'incorrect':true});
      return true
    }
    else if( hoy > inicio ){
      this.mensajeError = "El evento no puede empezar hoy o antes de hoy."
      this.formFechas.setErrors({'incorrect':true});
      return true
    }
    else if( hoy > cierre ){
      this.mensajeError = "El evento no puede terminar hoy o antes de hoy."
      this.formFechas.setErrors({'incorrect':true});
      return true
    }
    else{
      return false
    }
  }

  compararHorarios(){
    let inicio = new Date(this.formFechas.get('diaInicio').value);
    let cierre = new Date(this.formFechas.get('diaFin').value);


    if(inicio.getTime() === cierre.getTime()){

      let horarioInicio = this.formFechas.get('horaInicio');
      let horarioCierre = this.formFechas.get('horaFin');

      if(horarioInicio.value >= horarioCierre.value) {
        this.formFechas.setErrors({'incorrect': true})
        return true
      }
      else{
        console.log(this.formFechas);
        return false

      }
    }
  }

  get validacionTamImg(){
    return this.formImgE.get('imgPrincipal').invalid && this.formImgE.get('imgPrincipal').dirty
  }

  get validacionTamImgs(){
    return this.formImgE.get('imgsEvento').invalid && this.formImgE.get('imgsEvento').dirty
  }

  get validacionTamImgCarousel(){
    return this.formImgE.get('imgCarousel').invalid && this.formImgE.get('imgCarousel').dirty
  }

  editarBoleto( id:number){
    this.router.navigate(['editar-boleto', id])
  }

  refresh(){
    this.activatedRoute.params.subscribe( params => {
      this.eventosService.getEvento(params['id']).subscribe( resultado => this.evento = resultado[0]);
      this.eventosService.getImgs(params['id']).subscribe( resultado => this.imgs = resultado);
      this.boletosService.getBoletos(params['id']).subscribe( resultado => {
        if(resultado == null){
          this.noBoletos = true;
        }else{
          this.noBoletos = false;
          this.boletos = resultado;
        }
      });
    });
  }

  guardarInfo(){
    this.infoEvento.nombre = this.formInfoE.get('nombre').value;
    this.infoEvento.tipo = this.formInfoE.get('tipo').value;
    this.infoEvento.desc = this.formInfoE.get('desc').value;
    this.infoEvento.orden = this.formInfoE.get('orden').value;
    this.infoEvento.enlace = this.formInfoE.get('enlace').value;

    this.eventosService.buscarNombre(this.infoEvento.nombre).subscribe( datos => {
      if(datos['estado'] == 0){
        this.errorNombre = datos['mensaje'];
        window.confirm(this.errorNombre);
      }
      else if(datos['estado'] == 1){
        this.eventosService.buscarLugar(this.infoEvento.id, this.infoEvento.orden).subscribe(datos => {
          if(datos['estado'] == 0){
            console.log(datos['estado']);
            this.errorOrden = datos['mensaje'];
            this.modalError.nativeElement.click();
          }
          else if(datos['estado'] == 1){
            this.eventosService.modificarInfoEvento(this.infoEvento).subscribe( datos => {
              if(datos['resultado'] == "ERROR"){
                console.log("ERROR");
                return
              }else if(datos['resultado'] == "OK"){
                this.refresh();
                window.confirm("Información modificada con éxito");
              }
            })
          }
        });
      }
    });


  }

  liberarLugar(){
    this.eventosService.liberarLugar(this.formInfoE.get('orden').value).subscribe( datos => {
      if(datos['resultado'] == "ERROR"){
        console.log("ERROR");
        return
      }
      else if(datos['resultado'] == "OK"){
        window.confirm("Lugar liberado con exito");
        this.cerrarModalError.nativeElement.click();
      }
    })
  }

  guardarFechas(){
    this.fechasEvento.diaInicio = this.formFechas.get('diaInicio').value;
    this.fechasEvento.diaFin = this.formFechas.get('diaFin').value;
    this.fechasEvento.horaInicio = this.formFechas.get('horaInicio').value;
    this.fechasEvento.horaFin = this.formFechas.get('horaFin').value;
    console.log(this.fechasEvento.horarioInicio);
    console.log(this.fechasEvento.horarioFin);

    console.log(this.fechasEvento);

    this.eventosService.modificarHorarioEvento(this.fechasEvento).subscribe( datos => {
      if(datos['resultado'] == "ERROR"){
        console.log("ERROR");
        return
      }else if(datos['resultado'] == "OK"){
        this.refresh();
        window.confirm("Horario modificado con éxito");
      }
    })
  }

  guardarImg(){
    this.imgsEvento.imgPrincipal = this.imgSeleccionada;
    this.imgsEvento.imgCarousel = this.imgCarouselSeleccionada;
    this.imgsEvento.imgs = this.imgsSeleccionadas;

    this.eventosService.modificarImgsEvento(this.imgsEvento).subscribe( datos => {
      if(datos['resultado'] == "ERROR"){
        console.log("ERROR");
        return
      }else if(datos['resultado'] == "OK"){
        this.refresh();

        this.borrarImgPrincipal();
        this.borrarImgCarousel();

        this.urls = [];
        this.imgsSeleccionadas = [];
        this.imgsInput.nativeElement.value = null;
        window.confirm("Imagen(es) modificada(s) con éxito");
      }
    });
  }

  guardarBoletos(){
    this.boletoEvento.nombre = this.formBoletos.get('nombre').value;
    this.boletoEvento.desc = this.formBoletos.get('desc').value;
    this.boletoEvento.inventario = this.formBoletos.get('inventario').value;
    this.boletoEvento.precio = this.formBoletos.get('precio').value;

    this.boletosService.crearBoleto(this.boletoEvento).subscribe( datos => {
      if(datos['resultado'] == "ERROR"){
        console.log("ERROR");
        return
      }
      else if(datos['resultado'] == "OK"){
        this.refresh();
        window.confirm("Boleto creado con éxito");
        this.formBoletos.reset();
      }
    })
  }

  imgPrincipal(event){
    this.imgSeleccionada = <File>event.target.files[0];
    this.formImgE.controls['imgPrincipal'].setValue(this.imgSeleccionada);

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event:any) => {
        console.log(event.target.result);
          this.urlPrincipal = event.target.result;
      }
    }
  }

  imgCarousel(event){
    this.imgCarouselSeleccionada = <File>event.target.files[0];
    this.formImgE.controls['imgCarousel'].setValue(this.imgCarouselSeleccionada);

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event:any) => {
        console.log(event.target.result);
          this.urlCarousel = event.target.result;
      }
    }
  }

  multiImg(event) {

    if (event.target.files && event.target.files[0]) {
      for (let i = 0; i < event.target.files.length; i++) {
        var reader = new FileReader();

        reader.onload = (event:any) => {
          this.urls.push(event.target.result);
        }
        reader.readAsDataURL(event.target.files[i]);

        var selectedFile = event.target.files[i];
        this.imgsSeleccionadas.push(selectedFile);
        this.listaImg.push(selectedFile.name)
      }
    }
    this.formImgE.controls['imgsEvento'].setValue(this.imgsSeleccionadas);

  }

  borrarImgPrincipal(){
    this.urlPrincipal = null;
    this.formImgE.controls['imgPrincipal'].setValue("");
    this.imgInputP.nativeElement.value = null;
  }

  borrarImgCarousel(){
    this.urlCarousel = null;
    this.formImgE.controls['imgCarousel'].setValue("");
    this.imgInputC.nativeElement.value = null;
  }

  borrarImgs( url:any, index:number ){
    this.urls = this.urls.filter((a) => a !== url);
    this.listaImg.splice(index, 1);
    this.imgsSeleccionadas.splice(index, 1);

    this.formImgE.controls['imgsEvento'].reset();

    console.log(this.formImgE.get('imgsEvento').value);
    if(this.imgsSeleccionadas.length == 0){
      this.formImgE.controls['imgsEvento'].setValue("");
      this.imgsInput.nativeElement.value = null;
    }

    console.log(this.formImgE);
  }

  eliminarImg( id:number ){
    if(confirm("Está seguro de querer eliminar esta imagen?")){
      this.eventosService.eliminarImgs(id).subscribe( datos => {
        if(datos['resultado'] == "OK"){
          this.refresh();
          window.confirm("Imagen eliminada con éxito");
        }
      })
    }
  }

  eliminarBoleto( id_boleto:number){
    if(window.confirm("Está seguro de querer eliminar este boleto?")){
      this.boletosService.eliminarBoleto(id_boleto).subscribe( datos => {
        if(datos['resultado'] == "OK"){
          this.refresh();
          window.confirm("Imagen eliminada con éxito");
        }
      })
    }
  }
}
