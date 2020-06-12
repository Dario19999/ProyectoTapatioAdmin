import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-evento-editar',
  templateUrl: './evento-editar.component.html'
})
export class EventoEditarComponent implements OnInit {

  formInfo:FormGroup
  formFechas:FormGroup
  formImg:FormGroup

  urls = [];
  urlPrincipal = "";

  constructor(private fb:FormBuilder) { }

  ngOnInit() {
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

  guardarInfo(){}
  guardarFechas(){}
  guardarImg(){}

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

}
