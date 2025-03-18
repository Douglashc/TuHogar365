import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCrearServiciosComponent } from './form-crear-servicios.component';

describe('FormCrearServiciosComponent', () => {
  let component: FormCrearServiciosComponent;
  let fixture: ComponentFixture<FormCrearServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCrearServiciosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormCrearServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
