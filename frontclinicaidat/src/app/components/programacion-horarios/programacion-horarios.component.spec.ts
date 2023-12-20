import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramacionHorariosComponent } from './programacion-horarios.component';

describe('ProgramacionHorariosComponent', () => {
  let component: ProgramacionHorariosComponent;
  let fixture: ComponentFixture<ProgramacionHorariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramacionHorariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramacionHorariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
