import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { PublicacionesService } from '../../services/publicaciones.service';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html'
})
export class PublicacionesComponent implements OnInit {

  formPublicaciones:FormGroup

  urls = [];
  urlPrincipal = null;

  publicaciones = null;

  publicacion = {
    id_publicacion:null,
    titulo_pub:null,
    articulo_pub:null
  }

  imgSeleccionada: File;
  imgsSeleccionadas:File[] = [];
  listaImg:any[] = [];

  @ViewChild('imgInputP',{ static: false }) imgInputP:ElementRef;
  @ViewChild('imgsInput',{ static: false }) imgsInput:ElementRef;
  @ViewChild('cerrar',{ static: false }) cerrar;

  constructor(private router:Router,
              private fb:FormBuilder,
              private publicacionesService:PublicacionesService
             ) { }

  ngOnInit() {
    this.getPublicaciones();
    this.formPublicacionesInit();
  }

  formPublicacionesInit(){
    this.formPublicaciones = this.fb.group({
      titulo:['', [Validators.required]],
      articulo:['', [Validators.required]],
      imgPrincipal:['', [Validators.required, RxwebValidators.image({minHeight:690, maxHeight:2160, minWidth:950, maxWidth:4096})]],
      imgsPublicacion:['', [Validators.required, RxwebValidators.image({minHeight:690, maxHeight:2160, minWidth:950, maxWidth:4096})]]
    })
  }

  getPublicaciones(){
    this.publicacionesService.getPublicaciones().subscribe( resultado => this.publicaciones = resultado )
  }

  get validacionTitulo(){
    return this.formPublicaciones.get('titulo').invalid && this.formPublicaciones.get('titulo').touched
  }

  get tituloExistente(){
    return this.formPublicaciones.get('titulo').invalid && this.formPublicaciones.get('titulo').value != "" && !this.formPublicaciones.get('titulo').pristine
  }

  get validacionArticulo(){
    return this.formPublicaciones.get('articulo').invalid && this.formPublicaciones.get('articulo').touched
  }

  get validacionImgPrincipal(){
    return this.formPublicaciones.get('imgPrincipal').invalid && this.formPublicaciones.get('imgPrincipal').touched
  }

  get validacionImgs(){
    return this.formPublicaciones.get('imgsPublicacion').invalid && this.formPublicaciones.get('imgsPublicacion').touched
  }

  get validacionTamImg(){
    return this.formPublicaciones.get('imgPrincipal').invalid && this.formPublicaciones.get('imgPrincipal').dirty && this.formPublicaciones.get('imgPrincipal').value != ""
  }

  get validacionTamImgs(){
    return this.formPublicaciones.get('imgsPublicacion').invalid && this.formPublicaciones.get('imgsPublicacion').dirty && this.formPublicaciones.get('imgsPublicacion').value != ""
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

    this.formPublicaciones.controls['imgsPublicacion'].setValue(this.imgsSeleccionadas);
  }

  imgPrincipal(event){
    this.imgSeleccionada = <File>event.target.files[0];
    this.formPublicaciones.controls['imgPrincipal'].setValue(this.imgSeleccionada);

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event:any) => {
        // console.log(event.target.result);
          this.urlPrincipal = event.target.result;
      }
    }
  }

  borrarImgPrincipal(){
    this.urlPrincipal = null;
    this.formPublicaciones.controls['imgPrincipal'].setValue("");
    this.imgInputP.nativeElement.value = null;
  }

  borrarImgs( url:any, index:number ){
    this.urls = this.urls.filter((a) => a !== url);
    this.listaImg.splice(index, 1);
    this.imgsSeleccionadas.splice(index, 1);
  }

  editarPublicacion( id:number ){
    this.router.navigate(['editar-publicacion', id])
  }

  eliminarPublicacion( id:number ){
    if(confirm("Está seguro de querer eliminar este evento?")){
      this.publicacionesService.eliminarPublicacion(id).subscribe(datos => {
        if (datos['resultado']=='OK') {
          this.getPublicaciones();
        }
      });
    }
  }

  guardarPublicacion(){
    console.log(this.formPublicaciones);
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
    else{
      this.publicacionesService.crearPublicacion(this.formPublicaciones.value).subscribe(datos => {
        if(datos["resultado"] == "OK"){
          this.getPublicaciones();
          this.formPublicaciones.reset();

          this.borrarImgPrincipal();

          this.urls = [];
          this.imgsInput.nativeElement.value = null;
          this.cerrar.nativeElement.click();
        }
        else{
          console.log("ERROR");
        }
      }, (err:HttpErrorResponse) => {
          this.formPublicaciones.get('titulo').setErrors({'incorrect':true});
          console.log(err);
          return throwError(err);
      });
    }
  }
}
