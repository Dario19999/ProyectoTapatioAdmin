import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventosService } from '../../services/eventos.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ViewChild,ElementRef } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html'
})
export class EventosComponent implements OnInit {

  formEventos:FormGroup;

  urls = [];
  urlPrincipal = null;
  urlCarousel = null;

  eventos = null;

  imgSeleccionada: File;
  imgCarouselSeleccionada: File;
  imgsSeleccionadas:File[] = [];
  listaImg:any[] = [];

  mensajeError = "";

  @ViewChild('imgInputP',{ static: false }) imgInputP:ElementRef;
  @ViewChild('imgInputC',{ static: false }) imgInputC:ElementRef;
  @ViewChild('imgsInput',{ static: false }) imgsInput:ElementRef;
  @ViewChild('cerrar',{ static: false }) cerrar;
  @ViewChild('modalError',{static: false}) modalError:ElementRef;

  constructor(private fb:FormBuilder,
              private router:Router,
              private eventosService:EventosService) {}

  ngOnInit() {
    this.getEventos();
    this.formInit();
    // this.cargarEvento();
  }

  getEventos(){
    this.eventosService.getEventos().subscribe( resultado => this.eventos = resultado);
  }

  eliminarEvento( id:number ) {
    if(confirm("Está seguro de querer eliminar este evento?")){
      this.eventosService.eliminarEvento(id).subscribe(datos => {
        if (datos['resultado']=='OK') {
          this.getEventos();
        }
      });
    }
  }

  formInit(){
    this.formEventos = this.fb.group({
      nombre:['', [Validators.required]],
      fecha: this.fb.group({
        inicio:['', [Validators.required]],
        cierre:['', [Validators.required]],
      }),
      horario: this.fb.group({
        inicio:['', [Validators.required]],
        cierre:['', [Validators.required]],
      }),
      tipo:['', [Validators.required]],
      enlace:['', Validators.required],
      desc:['', [Validators.required]],
      orden:['', Validators.required],
      imgPrincipal:['', [Validators.required, RxwebValidators.image({minHeight:690, maxHeight:2160, minWidth:950, maxWidth:4096})]],
      imgCarousel:['', [Validators.required, RxwebValidators.image({minWidth:1250, maxWidth:4096, minHeight:690, maxHeight:2160})]],
      imgsEvento: ['', [Validators.required, RxwebValidators.image({minHeight:690, maxHeight:2160, minWidth:950, maxWidth:4096})]]
    })
  }

  cargarEvento(){
    this.formEventos.setValue({
      nombre:"nombre",
      fecha: {
        inicio:"2020-07-04",
        cierre:"2020-07-11",
      },
      horario:{
        inicio:"15:28",
        cierre:"15:28",
      },
      tipo:"0",
      enlace:"asdasd",
      desc:"asdasda",
      ordenImg:"1",
      imgPrincipal:"",
      imgCarousel:"",
      imgsEvento: ""
    })
  }

  editarEvento( id:number ){
    this.router.navigate(['editar-evento', id])
  }

  compararFechas(){
    let inicio = new Date(this.formEventos.get('fecha.inicio').value);
    inicio.setMinutes(inicio.getMinutes() + inicio.getTimezoneOffset())

    let cierre = new Date(this.formEventos.get('fecha.cierre').value);
    cierre.setMinutes(cierre.getMinutes() + cierre.getTimezoneOffset())

    let hoy = new Date();
    hoy.setSeconds(0);
    hoy.setMinutes(0);
    hoy.setHours(0);

    if(inicio > cierre){
      this.mensajeError = "El evento no puede terminar antes de empezar."
      this.formEventos.get('fecha').setErrors({'incorrect':true});
      return true
    }
    else if( hoy > inicio ){
      this.mensajeError = "El evento no puede empezar hoy o antes de hoy."
      this.formEventos.get('fecha').setErrors({'incorrect':true});
      return true
    }
    else if( hoy > cierre ){
      this.mensajeError = "El evento no puede terminar hoy o antes de hoy."
      this.formEventos.get('fecha').setErrors({'incorrect':true});
      return true
    }
    else{
      return false
    }
  }

  compararHorarios(){
    let inicio = new Date(this.formEventos.get('fecha.inicio').value);
    let cierre = new Date(this.formEventos.get('fecha.cierre').value);


    if((inicio.getTime() === cierre.getTime()) && this.formEventos.get('horario').dirty){

      let horarioInicio = this.formEventos.get('horario.inicio');
      let horarioCierre = this.formEventos.get('horario.cierre');

      if((horarioInicio.value >= horarioCierre.value) && (horarioInicio.dirty && horarioCierre.dirty)) {
        this.formEventos.get('horario').setErrors({'incorrect':true});
        return true
      }
      else{
        return false
      }
    }
  }

  get validacionNombre(){
    return this.formEventos.get('nombre').invalid && this.formEventos.get('nombre').touched && this.formEventos.get('nombre').pristine
  }

  get nombreExistente(){
    return this.formEventos.get('nombre').invalid && this.formEventos.get('nombre').value != "" && !this.formEventos.get('nombre').pristine
  }

  get validacionFechaInicio(){
    return this.formEventos.get('fecha.inicio').invalid && this.formEventos.get('fecha.inicio').touched
  }

  get validacionFechaCierre(){
    return this.formEventos.get('fecha.cierre').invalid && this.formEventos.get('fecha.cierre').touched
  }

  get validacionHorarioInicio(){
    return this.formEventos.get('horario.inicio').invalid && this.formEventos.get('horario.inicio').touched
  }

  get validacionHorarioCierre(){
    return this.formEventos.get('horario.cierre').invalid && this.formEventos.get('horario.cierre').touched
  }

  get validacionTipo(){
    return this.formEventos.get('tipo').invalid && this.formEventos.get('tipo').touched
  }

  get validacionEnlace(){
    return this.formEventos.get('enlace').invalid && this.formEventos.get('enlace').touched
  }

  get validacionDesc(){
    return this.formEventos.get('desc').invalid && this.formEventos.get('desc').touched
  }

  get validacionImg(){
    return this.formEventos.get('imgPrincipal').invalid && this.formEventos.get('imgPrincipal').touched
  }

  get validacionImgCarousel(){
    return this.formEventos.get('imgCarousel').invalid && this.formEventos.get('imgCarousel').touched
  }

  get validacionImgs(){
    return this.formEventos.get('imgsEvento').invalid && this.formEventos.get('imgsEvento').touched
  }

  get validacionTamImg(){
    return this.formEventos.get('imgPrincipal').invalid && this.formEventos.get('imgPrincipal').dirty && this.formEventos.get('imgPrincipal').value != ""
  }

  get validacionTamImgCarousel(){
    return this.formEventos.get('imgCarousel').invalid && this.formEventos.get('imgCarousel').dirty && this.formEventos.get('imgCarousel').value != ""
  }

  get validacionTamImgs(){
    return this.formEventos.get('imgsEvento').invalid && this.formEventos.get('imgsEvento').dirty && this.formEventos.get('imgsEvento').value != ""
  }

  get validacionOrden(){
    return this.formEventos.get('orden').invalid && this.formEventos.get('orden').touched
  }

  imgPrincipal(event){
    this.imgSeleccionada = <File>event.target.files[0];
    this.formEventos.controls['imgPrincipal'].setValue(this.imgSeleccionada);

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event:any) => {
          this.urlPrincipal = event.target.result;
      }
    }
  }

  imgCarousel(event){
    this.imgCarouselSeleccionada = <File>event.target.files[0];
    this.formEventos.controls['imgCarousel'].setValue(this.imgCarouselSeleccionada);

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event:any) => {
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
      this.formEventos.controls['imgsEvento'].setValue(this.imgsSeleccionadas);
  }

  borrarImgPrincipal(){
    this.urlPrincipal = null;
    this.formEventos.controls['imgPrincipal'].setValue("");
    this.imgInputP.nativeElement.value = null;
  }

  borrarImgCarousel(){
    this.urlCarousel = null;
    this.formEventos.controls['imgCarousel'].setValue("");
    this.imgInputC.nativeElement.value = null;
  }

  borrarImgs( url:any, index:number ){
    this.urls = this.urls.filter((a) => a !== url);
    this.listaImg.splice(index, 1);
    this.imgsSeleccionadas.splice(index, 1);
  }

  lugarOcupado(){
    let lugarElegido = this.formEventos.get('orden').value;

    if(lugarElegido == "1"){
      console.log(lugarElegido);
      this.modalError.nativeElement.modal("show");
      return true
    }
    else{
      return false
    }
  }

  guardarEvento(){
    console.log(this.formEventos);

    if(this.formEventos.invalid){
      Object.values(this.formEventos.controls).forEach( control =>{

        if(control instanceof FormGroup){
          Object.values(control.controls).forEach( control => control.markAllAsTouched())
        }
        else{
          control.markAllAsTouched();
        }
      });
      return;
    }
    else{

      this.eventosService.crearEvento(this.formEventos.value).subscribe( datos => {
          console.log(datos['resultado']);
          if(datos['resultado'] == 'OK'){
            this.getEventos();
            this.formEventos.reset();
            console.log(this.formEventos);

            this.borrarImgPrincipal();

            this.borrarImgCarousel();

            this.urls = [];
            this.imgsInput.nativeElement.value = null;
            this.cerrar.nativeElement.click();
          }
        },(err:HttpErrorResponse)=>{
          this.formEventos.get('nombre').setErrors({'incorrect':true});
          console.log(err);
          return throwError(err);
        }
      );
    }
  }
}
