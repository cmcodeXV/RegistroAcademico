import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriaNewComponent } from './materia-new.component';

describe('MateriaNewComponent', () => {
  let component: MateriaNewComponent;
  let fixture: ComponentFixture<MateriaNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MateriaNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriaNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
