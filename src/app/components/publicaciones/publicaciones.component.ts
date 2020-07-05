import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { PublicacionesService } from '../../services/publicaciones.service';

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
      cuerpo:['', [Validators.required]],
      imgPrincipal:['', [Validators.required, RxwebValidators.image({minHeight:690, maxHeight:2160, minWidth:950, maxWidth:4096})]],
      imgsPublicacion:['', [RxwebValidators.image({minHeight:690, maxHeight:2160, minWidth:950, maxWidth:4096})]]
    })
  }

  getPublicaciones(){
    this.publicacionesService.getPublicaciones().subscribe( resultado => this.publicaciones = resultado )
  }

  get validacionTitulo(){
    return this.formPublicaciones.get('titulo').invalid && this.formPublicaciones.get('titulo').touched
  }

  get validacionCuerpo(){
    return this.formPublicaciones.get('cuerpo').invalid && this.formPublicaciones.get('cuerpo').touched
  }

  get validacionImgPrincipal(){
    return this.formPublicaciones.get('imgPrincipal').invalid && this.formPublicaciones.get('imgPrincipal').touched && this.formPublicaciones.get('imgPrincipal').pristine
  }

  get validacionImgs(){
    return this.formPublicaciones.get('imgsPublicacion').invalid && this.formPublicaciones.get('imgsPublicacion').touched && this.formPublicaciones.get('imgsPublicacion').pristine
  }

  get validacionTamImg(){
    return this.formPublicaciones.get('imgPrincipal').invalid && this.formPublicaciones.get('imgPrincipal').dirty
  }

  get validacionTamImgs(){
    return this.formPublicaciones.get('imgsPublicacion').invalid && this.formPublicaciones.get('imgsPublicacion').dirty
  }

  multiImg(event) {

    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
          var reader = new FileReader();

          reader.onload = (event:any) => {
            // console.log(event.target.result);
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
        // console.log(event.target.result);
          this.urlPrincipal = event.target.result;
      }
    }
  }

  borrarImgPrincipal(){
    this.urlPrincipal = null;
    this.formPublicaciones.controls['imgPrincipal'].setValue("")
  }

  borrarImgs( index:number ){
    if (index !== -1) {
      this.urls.splice(index, 1);
    }

    this.formPublicaciones.controls['imgsPublicacion'].setValue("");
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
