import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-estadisticas-evento',
  templateUrl: './estadisticas-evento.component.html',
  styleUrls: ['./estadisticas-evento.component.css']
})
export class EstadisticasEventoComponent implements OnInit {

  tabActive=1;
  edades:any=[];
  semanas:any=[];

  constructor(private activatedRoute:ActivatedRoute,private router:Router, private eventosService:EventosService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      this.eventosService.getVentasEdad(params['id']).subscribe(resultado=>{
        this.edades=resultado
      })
  
      this.eventosService.getDiasVendidos(params['id']).subscribe(resultado=>{
        this.semanas=resultado
      })
    })
    
  }

  mostrarEdades(){
    this.tabActive=1;
  }
  
  mostrarDias(){
    this.tabActive=2;
  }

}
