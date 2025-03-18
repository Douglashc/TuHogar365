import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCrearTareaComponent } from './form-crear-tarea.component';

describe('FormCrearTareaComponent', () => {
  let component: FormCrearTareaComponent;
  let fixture: ComponentFixture<FormCrearTareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCrearTareaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormCrearTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
