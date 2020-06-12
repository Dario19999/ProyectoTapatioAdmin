import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-repartidores',
  templateUrl: './repartidores.component.html'
})
export class RepartidoresComponent implements OnInit {

  formRepartidor:FormGroup
  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.formInit();
  }

  formInit(){
    this.formRepartidor = this.fb.group({
      nombre:['', Validators.required],
      apellidoP:['', Validators.required],
      apellidoM:['', Validators.required],
      correo:['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      contra:['', [Validators.required]],
      documento:['', Validators.required]
    });
  }

  get validacionNombre(){
    return this.formRepartidor.get('nombre').invalid && this.formRepartidor.get('nombre').touched
  }

  get validacionApellidoP(){
    return this.formRepartidor.get('apellidoP').invalid && this.formRepartidor.get('apellidoP').touched
  }

  get validacionApellidoM(){
    return this.formRepartidor.get('apellidoM').invalid && this.formRepartidor.get('apellidoM').touched
  }

  get validacionCorreo(){
    return this.formRepartidor.get('correo').invalid && this.formRepartidor.get('correo').touched
  }

  get validacionContra(){
    return this.formRepartidor.get('contra').invalid && this.formRepartidor.get('contra').touched
  }

  get validacionDoc(){
    return this.formRepartidor.get('documento').invalid && this.formRepartidor.get('documento').touched
  }

  guardarRepartidor(){
    if(this.formRepartidor.invalid){
      Object.values(this.formRepartidor.controls).forEach( control =>{

        if(control instanceof FormGroup){
          Object.values(control.controls).forEach( control => control.markAllAsTouched())
        }
        else{
          control.markAllAsTouched();
        }
      });
      return;
    }
    console.log(this.formRepartidor);
  }

}
