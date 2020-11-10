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
  edades:any;

  constructor(private router:Router, private eventosService:EventosService) { }

  ngOnInit(): void {
    this.eventosService.getVentasEdadGeneral().subscribe(resultado=>{
      resultado=this.edades
      console.log(resultado)
    })
  }

  mostrarEdades(){
    this.tabActive=1;
  }
  
  mostrarCasas(){
    this.tabActive=2;
  }

  mostrarColonias(){
    this.tabActive=3;
  }


}
