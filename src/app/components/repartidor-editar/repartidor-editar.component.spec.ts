import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepartidorEditarComponent } from './repartidor-editar.component';

describe('RepartidorEditarComponent', () => {
  let component: RepartidorEditarComponent;
  let fixture: ComponentFixture<RepartidorEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepartidorEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepartidorEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
