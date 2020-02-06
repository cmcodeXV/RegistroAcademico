import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatriculaNewComponent } from './matricula-new.component';

describe('MatriculaNewComponent', () => {
  let component: MatriculaNewComponent;
  let fixture: ComponentFixture<MatriculaNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatriculaNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatriculaNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
