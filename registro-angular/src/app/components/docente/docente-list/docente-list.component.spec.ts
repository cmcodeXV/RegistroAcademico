import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteListComponent } from './docente-list.component';

describe('DocenteListComponent', () => {
  let component: DocenteListComponent;
  let fixture: ComponentFixture<DocenteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocenteListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocenteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
