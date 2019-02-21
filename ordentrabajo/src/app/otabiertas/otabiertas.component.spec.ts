import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtabiertasComponent } from './otabiertas.component';

describe('OtabiertasComponent', () => {
  let component: OtabiertasComponent;
  let fixture: ComponentFixture<OtabiertasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtabiertasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtabiertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
