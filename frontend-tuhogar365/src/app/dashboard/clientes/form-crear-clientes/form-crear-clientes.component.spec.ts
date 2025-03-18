import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCrearClientesComponent } from './form-crear-clientes.component';

describe('FormCrearClientesComponent', () => {
  let component: FormCrearClientesComponent;
  let fixture: ComponentFixture<FormCrearClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCrearClientesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormCrearClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
