import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaEquiposComponent } from './tabla-equipos.component';

describe('TablaEquiposComponent', () => {
  let component: TablaEquiposComponent;
  let fixture: ComponentFixture<TablaEquiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaEquiposComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablaEquiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
