import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableProyectosComponent } from './table-proyectos.component';

describe('TableProyectosComponent', () => {
  let component: TableProyectosComponent;
  let fixture: ComponentFixture<TableProyectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableProyectosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
