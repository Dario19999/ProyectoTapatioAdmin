import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-evento-editar',
  templateUrl: './evento-editar.component.html'
})
export class EventoEditarComponent implements OnInit {

  formInfo:FormGroup;
  formFechas:FormGroup;
  formImg:FormGroup;

  promoFechas:FormGroup;
  promoEvento:FormGroup;
  promoCodigo:FormGroup;

  formBoletos:FormGroup;

  urls = [];
  urlPrincipal = "";

  cantBoletos:number = 0;

  constructor(private fb:FormBuilder) {}

  ngOnInit() {
    this.formInfoInit();
    this.formFechasInit();
    this.formImgInit();
    this.formBoletosInit();
  }

  formInfoInit(){
    this.formInfo = this.fb.group({
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
    this.formImg = this.fb.group({
      imgPrincipal:['',],
      ordenImg:['',],
      imgsEvento: ['']
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

  guardarInfo(){}
  guardarFechas(){}
  guardarImg(){}

  guardarBoletos(){
     console.log(this.formBoletos);
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
