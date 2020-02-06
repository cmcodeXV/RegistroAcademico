import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatriculaEditComponent } from './matricula-edit.component';

describe('MatriculaEditComponent', () => {
  let component: MatriculaEditComponent;
  let fixture: ComponentFixture<MatriculaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatriculaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatriculaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
