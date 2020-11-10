import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  tabActive=1;
  edades:any=[];
  compras:any=[];
  semanas:any=[];

  constructor(private router:Router, private eventosService:EventosService) { }

  ngOnInit(): void {
    this.eventosService.getVentasEdadGeneral().subscribe(resultado=>{
      this.edades=resultado
    })

    this.eventosService.getCompraUsuarioTotal().subscribe(resultado=>{
      this.compras=resultado
    })

    this.eventosService.getDiasVendidosTotal().subscribe(resultado=>{
      this.semanas=resultado
    })
  }

  mostrarEdades(){
    this.tabActive=1;
  }
  
  mostrarCompras(){
    this.tabActive=2;
  }

  mostrarDias(){
    this.tabActive=3;
  }


}
