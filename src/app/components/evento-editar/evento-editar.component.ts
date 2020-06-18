import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-evento-editar',
  templateUrl: './evento-editar.component.html'
})
export class EventoEditarComponent implements OnInit {

  formInfoE:FormGroup;
  formFechas:FormGroup;
  formImgE:FormGroup;

  promoFechas:FormGroup;
  promoEvento:FormGroup;
  promoCodigo:FormGroup;

  formBoletos:FormGroup;

  urls = [];
  urlPrincipal = null;
  urlCarousel = null;

  cantBoletos:number = 0;

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

  constructor(private fb:FormBuilder) {}

  ngOnInit() {
    this.formInfoInit();
    this.formFechasInit();
    this.formImgInit();
    this.formBoletosInit();
  }

  formInfoInit(){
    this.formInfoE = this.fb.group({
      nombre:['',],
      tipo:['',],
      desc:['',],
      enlace:['',]
    })
  }

  formFechasInit(){
    this.formFechas = this.fb.group({
      fecha: this.fb.group({
        inicio:['',],
        cierre:['',],
      }),
      horario: this.fb.group({
        inicio:['',],
        cierre:['',],
      }),
    })
  }

  formImgInit(){
    this.formImgE = this.fb.group({
      imgPrincipal:['',],
      ordenImg:['',],
      imgsEvento: [''],
      imgCarousel:['']
    })
  }

  formBoletosInit(){
    this.formBoletos = this.fb.group({
      boletos: this.fb.array([

      ])
    })
  }

  get boletos(){
    return this.formBoletos.get('boletos') as FormArray;
  }

  guardarInfo(){
    // if(this.formEventos.invalid){
    //   Object.values(this.formEventos.controls).forEach( control =>{

    //     if(control instanceof FormGroup){
    //       Object.values(control.controls).forEach( control => control.markAllAsTouched())
    //     }
    //     else{
    //       control.markAllAsTouched();
    //     }
    //   });
    //   return;
    // }
    console.log(this.formInfoE);
  }
  guardarFechas(){
    // if(this.formEventos.invalid){
    //   Object.values(this.formEventos.controls).forEach( control =>{

    //     if(control instanceof FormGroup){
    //       Object.values(control.controls).forEach( control => control.markAllAsTouched())
    //     }
    //     else{
    //       control.markAllAsTouched();
    //     }
    //   });
    //   return;
    // }
    console.log(this.formFechas);
  }
  guardarImg(){
    // if(this.formEventos.invalid){
    //   Object.values(this.formEventos.controls).forEach( control =>{

    //     if(control instanceof FormGroup){
    //       Object.values(control.controls).forEach( control => control.markAllAsTouched())
    //     }
    //     else{
    //       control.markAllAsTouched();
    //     }
    //   });
    //   return;
    // }
    console.log(this.formImgE);
  }

  guardarBoletos(){
     console.log(this.formBoletos);
  }

  borrarImgPrincipal(){
    this.urlPrincipal = null;
    this.formImgE.controls['imgPrincipal'].setValue("")
  }

  borrarImgCarousel(){
    this.urlCarousel = null;
    this.formImgE.controls['imgCarousel'].setValue("")
  }

  borrarImgs( index:number ){
    if (index !== -1) {
      this.urls.splice(index, 1);
    }

    this.formImgE.controls['imgsEvento'].setValue("");
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

  imgCarousel(event){
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

  crearBoleto(){
    this.cantBoletos++;
    const BOLETOS = <FormArray>this.formBoletos.get('boletos');

    BOLETOS.push(
      this.fb.group({
        nombre:['', Validators.required],
        desc:['', Validators.required],
        inventario:['', Validators.required],
        precio:['', Validators.required]
      })
    );
  }

  quitarBoleto( index:number ){

    this.cantBoletos--;
    this.boletos.removeAt(index);
  }

}
