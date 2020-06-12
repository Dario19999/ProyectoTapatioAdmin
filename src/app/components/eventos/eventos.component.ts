import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html'
})
export class EventosComponent implements OnInit {

  formEventos:FormGroup;
  urls = [];
  urlPrincipal = "";

  constructor(private fb:FormBuilder,
              private router:Router) {
    this.formInit()
   }

  ngOnInit() {
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
      enlace:[''],
      desc:['', [Validators.required]],
      imgPrincipal:['', [Validators.required]],
      ordenImg:['', Validators.required],
      imgsEvento: ['']
    })
  }

  editarEvento(){
    this.router.navigate(['editar-evento'])
  }

  get validacionNombre(){
    return this.formEventos.get('nombre').invalid && this.formEventos.get('nombre').touched
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

  get validacionDesc(){
    return this.formEventos.get('desc').invalid && this.formEventos.get('desc').touched
  }

  get validacionImg(){
    return this.formEventos.get('imgPrincipal').invalid && this.formEventos.get('imgPrincipal').touched
  }

  get validacionOrden(){
    return this.formEventos.get('ordenImg').invalid && this.formEventos.get('ordenImg').touched
  }

  imgPrincipal(event){
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event:any) => {
        console.log(event.target.result);
          this.urlPrincipal = event.target.result;
      }
    }
  }

  multiImg(event) {

    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
          var reader = new FileReader();

          reader.onload = (event:any) => {
            console.log(event.target.result);
              this.urls.push(event.target.result);
          }
          reader.readAsDataURL(event.target.files[i]);
        }
    }
  }

  guardarEvento(){
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
    console.log(this.formEventos);
  }
}
