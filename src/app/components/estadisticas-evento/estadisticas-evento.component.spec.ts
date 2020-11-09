import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasEventoComponent } from './estadisticas-evento.component';

describe('EstadisticasEventoComponent', () => {
  let component: EstadisticasEventoComponent;
  let fixture: ComponentFixture<EstadisticasEventoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadisticasEventoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticasEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
