import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html'
})
export class PublicacionesComponent implements OnInit {

  formPublicaciones:FormGroup

  urls = [];
  urlPrincipal = "";

  constructor(private router:Router,
              private fb:FormBuilder
    ) {}

  ngOnInit() {
    this.formPublicacionesInit();
  }

  formPublicacionesInit(){
    this.formPublicaciones = this.fb.group({
      titulo:['', [Validators.required]],
      cuerpo:['', [Validators.required]],
      imgPrincipal:['', [Validators.required]],
      imgsPublicacion:['', [Validators.required]],
    })
  }

  get validacionTitulo(){
    return this.formPublicaciones.get('titulo').invalid && this.formPublicaciones.get('titulo').touched
  }

  get validacionCuerpo(){
    return this.formPublicaciones.get('cuerpo').invalid && this.formPublicaciones.get('cuerpo').touched
  }

  get validacionImgPrincipal(){
    return this.formPublicaciones.get('imgPrincipal').invalid && this.formPublicaciones.get('imgPrincipal').touched
  }

  get validacionImgs(){
    return this.formPublicaciones.get('imgsPublicacion').invalid && this.formPublicaciones.get('imgsPublicacion').touched
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

  guardarPublicacion(){
    if(this.formPublicaciones.invalid){
      Object.values(this.formPublicaciones.controls).forEach( control =>{

        if(control instanceof FormGroup){
          Object.values(control.controls).forEach( control => control.markAllAsTouched())
        }
        else{
          control.markAllAsTouched();
        }
      });
      return;
    }
    console.log(this.formPublicaciones);
  }
}
