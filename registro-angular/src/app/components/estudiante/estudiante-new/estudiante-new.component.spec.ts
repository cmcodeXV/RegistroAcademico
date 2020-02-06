import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudianteNewComponent } from './estudiante-new.component';

describe('EstudianteNewComponent', () => {
  let component: EstudianteNewComponent;
  let fixture: ComponentFixture<EstudianteNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstudianteNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudianteNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
