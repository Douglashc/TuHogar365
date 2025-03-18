import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimirPdfComponent } from './imprimir-pdf.component';

describe('ImprimirPdfComponent', () => {
  let component: ImprimirPdfComponent;
  let fixture: ComponentFixture<ImprimirPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImprimirPdfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImprimirPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
