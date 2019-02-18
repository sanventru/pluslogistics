import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormdetalleComponent } from './formdetalle.component';

describe('FormdetalleComponent', () => {
  let component: FormdetalleComponent;
  let fixture: ComponentFixture<FormdetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormdetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormdetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
