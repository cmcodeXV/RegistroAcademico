import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteNewComponent } from './docente-new.component';

describe('DocenteNewComponent', () => {
  let component: DocenteNewComponent;
  let fixture: ComponentFixture<DocenteNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocenteNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocenteNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
