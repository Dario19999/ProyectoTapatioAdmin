import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-publicacion-editar',
  templateUrl: './publicacion-editar.component.html'
})
export class PublicacionEditarComponent implements OnInit {

  formInfoP:FormGroup;
  formImgP:FormGroup;

  urls = [];
  urlPrincipal = null;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['Anterior', 'Siguiente'],
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

  constructor( private fb:FormBuilder ) {

   }

  ngOnInit() {
    this.formInfoPInit();
    this.formImgPInit();
  }

  formInfoPInit(){
    this.formInfoP = this.fb.group({
      titulo:[''],
      cuerpo:['']
    })
  }

  formImgPInit(){
    this.formImgP = this.fb.group({
      imgPrincipal:[''],
      imgsPublicacion:['']
    })
  }

  guardarInfo(){

  }

  borrarImgPrincipal(){
    this.urlPrincipal = null;
    this.formImgP.controls['imgPrincipal'].setValue("")
  }

  borrarImgs( index:number ){
    if (index !== -1) {
      this.urls.splice(index, 1);
    }

    this.formImgP.controls['imgsPublicacion'].setValue("");
  }
  guardarImg(){
    // if(this.formImgP.invalid){
    //   Object.values(this.formImgP.controls).forEach( control =>{

    //     if(control instanceof FormGroup){
    //       Object.values(control.controls).forEach( control => control.markAllAsTouched())
    //     }
    //     else{
    //       control.markAllAsTouched();
    //     }
    //   });
    //   return;
    // }
    console.log(this.formImgP);
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
}
