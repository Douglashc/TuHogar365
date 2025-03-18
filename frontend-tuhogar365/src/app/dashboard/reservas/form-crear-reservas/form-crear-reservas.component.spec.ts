import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCrearReservasComponent } from './form-crear-reservas.component';

describe('FormCrearReservasComponent', () => {
  let component: FormCrearReservasComponent;
  let fixture: ComponentFixture<FormCrearReservasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCrearReservasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormCrearReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
